<template>
  <main class="page py-16 sm:py-20 md:py-24 xl:py-32">
    <router-link
      class="inline-flex items-center opacity-40 mr-auto"
      :to="{ name: 'Catalogue' }"
    >
      <i class="text-2xl mdi mdi-arrow-left-thin mr-2" />
      Keep Browsing
    </router-link>
    <h1 class="page-title">
      Confirm your redemption
    </h1>

    <div class="max-w-15xl flex flex-col-reverse lg:flex-row mx-auto">
      <cart-list class="w-full md:mr-8 lg:mr-12 2xl:mr-20" />
      <div class="w-full mb-4 sm:mb-8 lg:mb-0">
        <p class="text-sm sm:text-base md:text-lg 2xl:text-xl">
          Once you're ready to redeem your physicals,
          we'll collect your shipping information to ensure that your order is fulfilled.
          We take your privacy seriously, and do not share, sell,
          or otherwise distribute this information to any third parties.
          <br><br>
          Please remember that once an Antonym has been redeemed,
          it can no longer be used for redemption in the future.
          <br><br>
          Welcome to Brand3.
        </p>

        <hr class="<lg:hidden my-4">
        <router-link
          class="block w-1/2 <lg:hidden bg-hex-252525 text-white text-base text-center py-8 uppercase ml-auto"
          :to="{ name: 'Shipping' }"
        >
          Redeem
        </router-link>
      </div>
    </div>

    <hr class="lg:hidden my-4">
    <router-link
      class="block w-full lg:hidden bg-hex-252525 text-white text-base text-center py-8 uppercase"
      :to="{ name: 'Shipping' }"
    >
      Redeem
    </router-link>
  </main>
</template>

<route>
{
  "name": "Cart"
}
</route>
