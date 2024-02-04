import '@site/assets/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProgressBar from 'nextjs-progressbar';
import { NextAppProps, DefaultSeo } from '@site/utilities/deps';
import { ShopifyProvider, CartProvider } from '@shopify/hydrogen-react';
import { storeDomain, publicStorefrontToken, storefrontApiVersion } from '@site/utilities/storefront';
import CrispChatbot from '@site/components/CrispChatbot';
import Head from 'next/head';

export default function App({ Component, pageProps }: NextAppProps) {
  return (
    <ShopifyProvider
      languageIsoCode="EN"
      countryIsoCode="US"
      storeDomain={storeDomain}
      storefrontToken={publicStorefrontToken}
      storefrontApiVersion={storefrontApiVersion}
    >
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <DefaultSeo
        defaultTitle="Fluffy Town"
        titleTemplate="%s • Fluffy Town"
        description="🛍 We believe that fashion should never compromise on comfort."
      />

      <CartProvider>
        <ProgressBar color="orange" />
        <CrispChatbot />
        <Component {...pageProps} />
      </CartProvider>
    </ShopifyProvider>
  );
}
