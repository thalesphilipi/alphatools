import OpenSeaApiHandler from "@renderer/api/OpenSeaApiHandler";
import ButtonWrapper from "@renderer/components/ButtonWrapper";
import { styled } from "@renderer/config/stitches.config";
import useDebounce from "@renderer/hooks/useDebounce";
import { InfoTask, SlugData } from "@renderer/interfaces/AutoBidInterfaces";
import { addTask } from "@renderer/redux/autoBidCreationSlice";
import { useEffect, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import InputField from "./InputField";


export default function InputWrapper() {

	const [priceLimit, setPriceLimit] = useState('0');
	const [percent, setPercent] = useState('0');
	const [slug, setSlug] = useState('');
	const [floorPrice, setFloorPrice] = useState(0);
	const [startBid, setStartBid] = useState(0);
	const [isFieldError, setIsFieldError] = useState(false);
	const [isSlugError, setIsSlugError] = useState(false);
	const dispatch = useDispatch();
	const [debouncedSlug, isDebouncing] = useDebounce(slug, 740);
	const { data, isLoading, isFetching, isSuccess } = useQuery<SlugData, Error>(['autoBid', debouncedSlug], () => OpenSeaApiHandler.getSlugData(debouncedSlug),
		{
			enabled: !!debouncedSlug,
			retry: false,
			onError: () => { if (!isDebouncing) setIsSlugError(true) },
			onSuccess: (data) => {
				if (slug) {
					setPriceLimit((data.startBid + 0.0001).toString() || "");
					setStartBid(data.startBid);
					setFloorPrice(data.floorPrice);
				}
			},
		});
	useEffect(() => {
		if (data && !isDebouncing) {
			setPriceLimit((data.startBid + 0.0001).toString() || "");
			setStartBid(data.startBid);
			setFloorPrice(data.floorPrice);
		}
	}, [debouncedSlug, isDebouncing])

	
	useEffect(() => {
		if (isSlugError) setIsSlugError(false);
	}, [slug, isSuccess]);

	useEffect(() => {
		if (isFieldError) { setIsFieldError(false) }
	}, [priceLimit, percent, slug])

	function handleAddTask(e) {
		e.preventDefault();
		if (slug.trim().length <= 0 || priceLimit.trim().length <= 0) setIsFieldError(true);

		else if ( !isLoading && !isSlugError && !isFieldError && !isDebouncing && data) {
			const floorPrice = data.floorPrice;
			const startBid = data.startBid;
			const task: InfoTask = { slug, priceLimit: Number(priceLimit), percent: Number(percent) || 0, floorPrice, startBid };
			dispatch(addTask(task));
			setPercent('0');
			setSlug('');
			setPriceLimit('');
			setFloorPrice(0);
			setStartBid(0)
		}
	}


	return (
		<Wrapper onSubmit={handleAddTask} noValidate>
			<InputField
				divStyle={{ gridColumn: '1/3' }}
				onChange={(e) => { setSlug(e.target.value); setIsFieldError(false) }}
				isError={((isFieldError && slug.length <= 0) || isSlugError)}
				value={slug}
				label='Slug' />
			<InputField
				divStyle={{ gridColumn: '3/5' }}
				onChange={(e) => { setPriceLimit(e.target.value); setIsFieldError(false) }}
				isError={(isFieldError && priceLimit.length <= 0)}
				type={'number'} step={'0.001'} min={(data?.startBid || 0) + 0.0001} lang={'nl'}
				value={Number(priceLimit).toLocaleString('en', { maximumFractionDigits: 4 })}
				label='Price Limit'
			/>
			<InputField label='Floor Price' value={floorPrice.toLocaleString(navigator.language, { maximumFractionDigits: 4 }) || ""} readOnly />
			<InputField label='Start Bid' value={startBid.toLocaleString(navigator.language, { maximumFractionDigits: 4 }) || ""} readOnly />
			<InputField
				onChange={(e) => { setPercent(e.target.value); setIsFieldError(false) }}
				type={'number'}
				step={5}
				min={0}
				value={percent}
				label='Percent'
			/>
			<AddButton >
				<HiPlusSm />
			</AddButton>
		</Wrapper>
	)
}



const Wrapper = styled('form', {
	maxWidth: 597,
	display: "grid",
	gap: 12,

	gridTemplateColumns: 'minmax(0, 39%) minmax(0, 30.3%) minmax(0, 23%) minmax(0, 8%)',
	gridTemplateRows: '36px 36px',

	"@sm": {
		maxWidth: 'unset',
	}
})
const AddButton = styled(ButtonWrapper, {

	borderRadius: 5,
	background: '#293034',

	hover: {
		background: '#30383C',

	}
})