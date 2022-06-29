<template>
  <main class="page py-24 sm:py-28 md:py-32 xl:py-48">
    <router-link
      class="inline-flex items-center opacity-40 mr-auto"
      :to="{ name: 'Catalogue' }"
    >
      <i class="text-2xl mdi mdi-arrow-left-thin mr-2" />
      Keep Browsing
    </router-link>
    <h1 class="page-title">
      Shipping Information
    </h1>
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row lg:items-start">
        <div>
          <h3 class="font-bold text-xl uppercase">
            Contact Details
          </h3>
          <div class="mt-6 flex-grow flex flex-wrap items-start -m-1">
            <div class="w-full p-1">
              <base-input
                v-model="form.email"
                title="e-mail"
                :invalid="!form.fresh && validation.email"
              />
            </div>
            <div class="w-full p-1">
              <base-input
                v-model="form.discord"
                title="Discord ID"
              />
            </div>
            <div class="w-full p-1">
              <base-input
                v-model="form.country"
                title="Country/Region"
                :invalid="!form.fresh && validation.country"
                :options="countries"
              />
            </div>
          </div>

          <h3 class="font-bold text-xl uppercase mt-12">
            Shipping Address
          </h3>
          <div class="mt-6 flex-grow flex flex-wrap items-start -m-1">
            <div class="w-full sm:w-1/2 p-1">
              <base-input
                v-model="form.firstName"
                title="First name"
                :invalid="!form.fresh && validation.firstName"
              />
            </div>
            <div class="w-full sm:w-1/2 p-1">
              <base-input
                v-model="form.lastName"
                title="Last name"
                :invalid="!form.fresh && validation.lastName"
              />
            </div>
            <div class="w-full p-1">
              <base-input
                v-model="form.address1"
                title="Address Line 1"
                :invalid="!form.fresh && validation.address1"
              />
            </div>
            <div class="w-full p-1">
              <base-input
                v-model="form.address2"
                title="Address Line 2"
              />
            </div>
            <div class="w-full sm:w-1/2 xl:w-1/3 p-1">
              <base-input
                v-model="form.city"
                title="City"
                :invalid="!form.fresh && validation.city"
              />
            </div>
            <div class="w-full sm:w-1/2 xl:w-1/3 p-1">
              <base-input
                v-model="form.state"
                title="Province/State"
                :invalid="!form.fresh && validation.state"
              />
            </div>
            <div class="w-full sm:w-1/2 xl:w-1/3 p-1">
              <base-input
                v-model="form.zip"
                title="Zip/Postal Code"
                :invalid="!form.fresh && validation.zip"
              />
            </div>
          </div>
        </div>
        <div class="lg:ml-12 2xl:ml-24 lg:p-5 mt-10 md:mt-16 lg:mt-22 lg:border border-black lg:w-100 2xl:w-130 flex-shrink-0">
          <h6 class="font-bold uppercase">
            Final steps
          </h6>
          <p class="text-sm mt-4">
            Once an Antonym has been received for it’s physical,
            it’s status will irreversibly reflect as redeemed on the blockchain and within it’s metadata.
            <br><br>
            After signing this transaction with your wallet,
            your order and delivery information will be submitted to Antonym and your redemption will be completed.
            <br><br>
            Your personal information will not be stored on-chain,
            nor will Antonym store or otherwise preserve your data for any purposes
            that do not pertain to the redemption process.
          </p>

          <label
            class="h-6 flex items-center mt-24 lg:mt-10"
            for="agree"
          >
            <input
              id="agree"
              v-model="form.agree"
              class="checkbox"
              type="checkbox"
            >
            <span class="ml-2 text-xs">
              I have read and understood the above
            </span>
          </label>
          <hr class="mt-4 mb-8">
          <button
            class="toggle-button toggle-button--active w-full lg:text-base py-5 lg:py-6 rounded-none uppercase"
            :class="{ 'cursor-not-allowed': !form.agree }"
            :disabled="!form.agree"
            @click="confirm"
          >
            Confirm transactions
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { isValidEmail } from '@/utils/validators'
import { zones } from '@/consts'

const countries = zones.map((zone, idx) => ({
  label: zone.countries[0].name,
  value: zone.countries[0].code
}))

const form = reactive({
  fresh: true,
  email: '',
  discord: '',
  country: '',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  agree: false
})

const validation = computed(() => ({
  email: !(form.email && isValidEmail(form.email)) && 'Please enter a valid email',
  country: !form.country && 'Please enter a valid country code',
  firstName: !form.firstName && 'Please enter a valid first name',
  lastName: !form.lastName && 'Please enter a valid last name',
  address1: !form.address1 && 'Please enter a valid address',
  city: !form.city && 'Please enter a valid city name',
  state: !form.state && 'Please enter a valid state/province name',
  zip: !form.zip && 'Please enter a valid zip code'
}))

const isValidForm = computed(() => !Object.values(validation.value).find((invalid) => !!invalid))

const confirm = () => {
  form.fresh = false

  if (isValidForm.value) {
    // Hello World
  }
}
</script>

<route>
{
  "name": "Shipping"
}
</route>
