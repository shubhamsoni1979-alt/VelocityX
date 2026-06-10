<template>
  <div class="flex flex-col items-center justify-center px-4 py-4">
    <div class="w-full max-w-md">
      <!-- Logos -->
      <div class="flex flex-col items-center mb-4">
        <NuxtImg
          src="/images/D2CGuru_Logo_Black.svg"
          alt="D2C Guru Logo"
          class="h-10 w-auto mb-2 dark:hidden"
        />
        <NuxtImg
          src="/images/D2CGuru_Logo_White.svg"
          alt="D2C Guru Logo"
          class="h-10 w-auto mb-2 hidden dark:block"
        />
      </div>

      <!-- Form Card -->
      <div
        class="w-full bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800"
      >
        <h1
          class="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white tracking-tight"
        >
          Submit Brand Details
        </h1>

        <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
          <UFormField label="Website/Instagram/Reel/Post/Profile Url" name="brandurl" required>
            <UInput
              v-model="state.brandurl"
              type="text"
              placeholder="https://..."
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UButton
            type="submit"
            block
            size="lg"
            class="font-bold shadow-md"
            :loading="isSubmitting"
          >
            Submit Brand
          </UButton>
        </UForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { z } from 'zod'

  const toast = useToast()

  // Accepted URL patterns: Instagram profile/post/reel or any valid http(s) website
  const INSTAGRAM_REGEX = /^(https?:\/\/)?(www\.)?instagram\.com\/.+/i
  const WEBSITE_REGEX = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/i

  const schema = z.object({
    brandurl: z
      .string()
      .min(1, 'URL is required')
      .refine(
        (val) => {
          // Normalize: prepend https:// if missing for validation
          const normalized = /^https?:\/\//i.test(val) ? val : `https://${val}`
          return INSTAGRAM_REGEX.test(normalized) || WEBSITE_REGEX.test(normalized)
        },
        { message: 'Please enter a valid website or Instagram URL' }
      )
      .transform((val) => {
        // Ensure the stored value always has a protocol
        return /^https?:\/\//i.test(val) ? val : `https://${val}`
      })
  })

  const state = reactive({
    brandurl: ''
  })

  const isSubmitting = ref(false)

  async function onSubmit() {
    isSubmitting.value = true
    const { createItems } = useDirectusItems()

    try {
      await createItems({
        collection: 'scrape_queue',
        items: {
          input_url: state.brandurl
        }
      })

      state.brandurl = ''

      toast.add({
        title: 'Brand submitted!',
        description: 'Your brand details have been submitted successfully.',
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    } catch (error) {
      console.error('Failed to submit brand details', error)

      toast.add({
        title: 'Submission failed',
        description: 'Something went wrong while submitting your brand. Please try again.',
        color: 'error',
        icon: 'i-lucide-circle-x'
      })
    } finally {
      isSubmitting.value = false
    }
  }
</script>
