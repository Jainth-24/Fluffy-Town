import { getPolicies } from '@site/lib/shopify';
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function FooterSection(props: any) {
  const { menu, shop } = props;
  const [policies, setPolicies] = useState<any>(null);

  useEffect(() => {
    const fetchPoliciesData = async () => {
      try {
        const data = await getPolicies();
        setPolicies(data.body.data.shop);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchPoliciesData();
  }, []);
  const nonNullPolicies = policies ? Object?.values(policies)?.filter((policy) => policy !== null) : [];
  return (
    <>
      <Footer container style={{ backgroundColor: 'rgba(254, 221, 0, 1)' }}>
        <div className="w-full">
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} className='hover:bg-black-500 shadow-md'/>
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
              <FooterIcon href="#" icon={BsGithub} />
              <FooterIcon href="#" icon={BsDribbble} />
            </div>
          </div>
          <FooterDivider />
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <FooterBrand
                href={shop.primaryDomain}
                src={shop.brand.logo.image.url}
                alt="Brand Logo"
                name={shop.name}
              />
              <p className="mx-auto my-5 pr-10">{shop.description}</p>
            </div>
            <div className="grid lg:w-[70%] grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-6 max-md:gap-5">
              <div>
                <FooterTitle title="Quick Links" />
                <FooterLinkGroup col>
                  <FooterLink href="/collections">Collections</FooterLink>
                  <FooterLink href="/products">Products</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                  {nonNullPolicies.map((item: any) => (
                    <FooterLink key={item.id} href={`/policies/${item.handle}`}>
                      {item.title}
                    </FooterLink>
                  ))}
                </FooterLinkGroup>
              </div>

              <div>
                <FooterTitle title="Location" />
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.408527723262!2d77.43016087488824!3d11.157357789015515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba909206a22d3ed%3A0x2595f46cfb1d70d9!2sFluffytown!5e0!3m2!1sen!2sin!4v1706789618245!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Footer>
      <FooterCopyright href="#" by={shop.name} year={2024} className="text-white bg-green-700 p-2" />
    </>
  );
}
