import EventCardImage from './event-card-image';
import Button from '../button';

interface EventCardProps {
	imageUrl: string;
	title: string;
	date: string;
	location: string;
	href?: string;
	fallbackLogo?: string;
}

const EventCard = ({
	imageUrl,
	title,
	date,
	location,
	href,
	fallbackLogo = '/logo1.png',
}: EventCardProps) => {
	return (
		<div className='bg-[#D9D9D9] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 h-full flex flex-col'>
		<div className='aspect-video w-full flex items-center justify-center bg-gray-100 relative'>
			<EventCardImage imageUrl={imageUrl} title={title} fallbackLogo={fallbackLogo} />
		</div>

		<div className='p-4 sm:p-5 md:p-6 flex flex-col flex-grow'>
			<h3
				className='text-lg font-fjalla mb-3 text-black h-12 flex items-start leading-tight'
				style={{ fontFamily: "'Fjalla One', sans-serif" }}
			>
				{title}
			</h3>

			<p className='text-base mb-1 text-black' style={{ fontFamily: "'Work Sans', sans-serif" }}>
				{date}
			</p>

			<p className='text-base mb-4 text-black' style={{ fontFamily: "'Work Sans', sans-serif" }}>
				{location}
			</p>

			{href && (
				<div className='mt-auto'>
					<Button href={href} className='w-full sm:w-auto'>
						Ver
					</Button>
				</div>
			)}
		</div>
	</div>
	);
};

export default EventCard;
