<template>
  <UContainer class="py-12" v-if="car">
    <!-- Back Button -->
    <div class="mb-8">
      <UButton
        icon="i-lucide-arrow-left"
        label="Back to Explore"
        variant="ghost"
        color="neutral"
        class="hover:translate-x-[-4px] transition-transform"
        @click="goBack"
      />
    </div>

    <!-- Main Detail Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">

      <!-- Left Column: Media & Highlights -->
      <div class="lg:col-span-7 space-y-8">
        <!-- Main Image Card -->
        <UCard
          :ui="{ body: 'p-0' }"
          class="overflow-hidden rounded-3xl border-0 shadow-lg relative group bg-neutral-900"
        >
          <img
            :src="car.image"
            :alt="`${car.brand} ${car.model}`"
            class="w-full aspect-[16/10] object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <UBadge
            color="success"
            variant="solid"
            class="absolute top-4 left-4 text-sm font-semibold shadow-md px-3 py-1"
          >
            {{ car.badge }}
          </UBadge>
        </UCard>

        <!-- Specifications Grid -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Specifications
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <!-- Year -->
            <div class="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 flex items-center gap-3">
              <div class="p-2 bg-primary/10 rounded-xl text-primary">
                <UIcon name="i-lucide-calendar" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs text-gray-400">Reg. Year</p>
                <p class="text-base font-bold">{{ car.year }}</p>
              </div>
            </div>
            <!-- Kilometers -->
            <div class="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 flex items-center gap-3">
              <div class="p-2 bg-primary/10 rounded-xl text-primary">
                <UIcon name="i-lucide-gauge" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs text-gray-400">KM Driven</p>
                <p class="text-base font-bold">{{ car.kmDriven }} km</p>
              </div>
            </div>
            <!-- Fuel Type -->
            <div class="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 flex items-center gap-3">
              <div class="p-2 bg-primary/10 rounded-xl text-primary">
                <UIcon name="i-lucide-fuel" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs text-gray-400">Fuel Type</p>
                <p class="text-base font-bold">{{ car.fuel }}</p>
              </div>
            </div>
            <!-- Transmission -->
            <div class="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 flex items-center gap-3">
              <div class="p-2 bg-primary/10 rounded-xl text-primary">
                <UIcon name="i-lucide-cog" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs text-gray-400">Transmission</p>
                <p class="text-base font-bold">{{ car.transmission }}</p>
              </div>
            </div>
            <!-- Ownership -->
            <div class="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 flex items-center gap-3">
              <div class="p-2 bg-primary/10 rounded-xl text-primary">
                <UIcon name="i-lucide-user" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs text-gray-400">Owner</p>
                <p class="text-base font-bold">{{ car.ownership }} Owner</p>
              </div>
            </div>
            <!-- Body Type -->
            <div class="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 flex items-center gap-3">
              <div class="p-2 bg-primary/10 rounded-xl text-primary">
                <UIcon name="i-lucide-car" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs text-gray-400">Body Type</p>
                <p class="text-base font-bold">{{ car.category }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div v-if="car.features.length > 0">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Key Features
          </h2>
          <div class="flex flex-wrap gap-3">
            <UBadge
              v-for="feature in car.features"
              :key="feature"
              color="neutral"
              variant="soft"
              class="text-sm px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-green-500" />
              {{ feature }}
            </UBadge>
          </div>
        </div>
      </div>

      <!-- Right Column: Pricing & Booking -->
      <div class="lg:col-span-5 space-y-6">
        <!-- Title & Price Card -->
        <UCard class="rounded-3xl border-0 shadow-lg p-4">
          <div class="space-y-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wider text-primary">
                {{ car.brand }}
              </p>
              <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mt-1 leading-tight">
                {{ car.model }}
              </h1>
              <p class="text-gray-500 dark:text-gray-400 mt-1">
                {{ car.variant }} &bull; {{ car.year }}
              </p>
            </div>

            <hr class="border-gray-100 dark:border-neutral-800" />

            <div class="flex items-baseline gap-3">
              <span class="text-4xl font-black text-gray-900 dark:text-white">
                ₹{{ car.discountedPrice.toLocaleString('en-IN') }}
              </span>
              <span class="text-lg text-gray-400 line-through">
                ₹{{ car.originalPrice.toLocaleString('en-IN') }}
              </span>
              <span class="text-sm text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-lg">
                Save ₹{{ (car.originalPrice - car.discountedPrice).toLocaleString('en-IN') }}
              </span>
            </div>

            <div class="p-3 bg-gray-50 dark:bg-neutral-800/50 rounded-2xl flex items-center justify-between">
              <span class="text-sm text-gray-500">EMI starts at</span>
              <span class="text-base font-extrabold text-gray-900 dark:text-white">
                ₹{{ car.emi.toLocaleString('en-IN') }}/month
              </span>
            </div>
          </div>
        </UCard>

        <!-- Test Drive Form -->
        <UCard class="rounded-3xl border-0 shadow-lg p-4">
          <template #header>
            <h3 class="text-xl font-bold">Book a Test Drive</h3>
            <p class="text-xs text-gray-400 mt-1">Experience this car first-hand. Select your preferred slot.</p>
          </template>

          <form @submit.prevent="submitBooking" class="space-y-4 mt-2">
            <div>
              <label class="text-sm font-medium block mb-1">Your Name</label>
              <UInput
                v-model="bookingForm.name"
                required
                placeholder="Enter full name"
                size="md"
              />
            </div>
            <div>
              <label class="text-sm font-medium block mb-1">Phone Number</label>
              <UInput
                v-model="bookingForm.phone"
                required
                type="tel"
                placeholder="Enter 10-digit mobile number"
                size="md"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium block mb-1">Date</label>
                <UInput
                  v-model="bookingForm.date"
                  required
                  type="date"
                  size="md"
                />
              </div>
              <div>
                <label class="text-sm font-medium block mb-1">Time</label>
                <UInput
                  v-model="bookingForm.time"
                  required
                  type="time"
                  size="md"
                />
              </div>
            </div>

            <UButton
              type="submit"
              color="primary"
              size="lg"
              block
              class="rounded-xl py-3 font-semibold mt-6"
              :loading="isSubmitting"
            >
              Confirm Booking
            </UButton>
          </form>
        </UCard>
      </div>

    </div>

    <!-- Similar Cars Recommendations -->
    <div class="mt-16 border-t border-gray-100 dark:border-neutral-800 pt-16" v-if="similarCars.length > 0">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Similar Cars You May Like
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CarCard
          v-for="sim in similarCars"
          :key="sim.id"
          :data="sim"
        />
      </div>
    </div>
  </UContainer>

  <!-- Empty State if car not found -->
  <UContainer class="py-24 text-center" v-else>
    <div class="max-w-md mx-auto space-y-6">
      <p class="text-6xl">🚗</p>
      <h1 class="text-3xl font-extrabold">Car Details Not Found</h1>
      <p class="text-gray-500">The car you are looking for might have been sold or does not exist in our inventory.</p>
      <UButton
        to="/brands"
        color="neutral"
        size="lg"
        class="rounded-xl px-6"
      >
        Go to Explore
      </UButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { allCars, type Car } from '~/data/cars'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const carId = Number(route.params.id)
const car = computed(() => allCars.find(c => c.id === carId))

// SEO Meta
watchEffect(() => {
  if (car.value) {
    useSeoMeta({
      title: `${car.value.brand} ${car.value.model} ${car.value.variant} | VelocityX`,
      description: `Buy certified used ${car.value.brand} ${car.value.model} (${car.value.year}) starting onwards from ₹${car.value.discountedPrice.toLocaleString('en-IN')} at VelocityX.`
    })
  }
})

// Booking Form State
const bookingForm = ref({
  name: '',
  phone: '',
  date: '',
  time: ''
})

const isSubmitting = ref(false)

function submitBooking() {
  isSubmitting.value = true
  // Mock API call
  setTimeout(() => {
    isSubmitting.value = false
    toast.add({
      title: 'Booking Confirmed!',
      description: `Hi ${bookingForm.value.name}, your test drive for the ${car.value?.brand} ${car.value?.model} is scheduled on ${bookingForm.value.date} at ${bookingForm.value.time}.`,
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    // Reset form
    bookingForm.value = {
      name: '',
      phone: '',
      date: '',
      time: ''
    }
  }, 1200)
}

// Similar cars of same category or brand, excluding current car
const similarCars = computed(() => {
  if (!car.value) return []
  return allCars
    .filter(c => c.id !== car.value!.id && (c.category === car.value!.category || c.brand === car.value!.brand))
    .slice(0, 3)
})

function goBack() {
  // If there's page history, go back, else redirect to explore page
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/brands')
  }
}
</script>
