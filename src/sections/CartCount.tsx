import { IconBag } from '@site/components/Icon';
import useAppStore from '@site/store/app-store';
import useCartStore from '@site/store/cart-store';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';

function CartCount({ isHome }: { isHome: boolean }) {
	const cart = useCartStore(state => state.cart);

	useEffect(() => {
		const createCart = async () => {
			await fetch(`/api/cart/create`, {
				method: 'POST',
			})
				.then(async response => {
					const data = await response.json();
					if (response.status === 200) {
						useCartStore.setState({ cart: data.cart });
					}
				})
				.catch(() => null);
		};
		createCart();
	}, []);

	return<div className='p-2'> <Badge dark={isHome} count={cart?.totalQuantity || 0} /></div>;
}

function Badge({ dark, count }: { count: number; dark: boolean }) {
	const BadgeCounter = useMemo(
		() => (
			<div className=''>
				<IconBag />
				<div
					className={clsx(
						'absolute bg-yellow-200 bottom-5 right-0 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px',
						{
							'text-primary dark:text-contrast dark:bg-primary':
								dark,
							'text-contrast ': !dark,
						}
					)}
				>
					<span>{count || 0}</span>
				</div>
			</div>
		),
		[count, dark]
	);

	return (
		<button
			onClick={() => useAppStore.setState({ openCartDrawer: true })}
			className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
		>
			{BadgeCounter}
		</button>
	);
}

export default CartCount;
