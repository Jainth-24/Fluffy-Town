import cn from 'clsx';
import { useFormStatus } from "react-dom";
export default function FormButton({
  btnText,
  state = 'Loading...',
}: {
  btnText: string;
  state?: string;
  variant?: 'primary' | 'outline';
}) {
	const status = useFormStatus();

  return (
    <div className="flex items-center justify-between">
			<button
				className={'btn btn--secondary block w-full rounded-md px-4 py-2'}
				type="submit"
				disabled={status?.pending}
			>
				{status?.pending ? state : btnText}
			</button>
		</div>
  );
}
