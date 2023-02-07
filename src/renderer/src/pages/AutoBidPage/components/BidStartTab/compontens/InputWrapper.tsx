import OpenSeaApiHandler from "@renderer/api/OpenSeaApiHandler";
import ButtonWrapper from "@renderer/components/ButtonWrapper";
import { styled } from "@renderer/config/stitches.config";
import useDebounce from "@renderer/hooks/useDebounce";
import { InfoTask, SlugData } from "@renderer/interfaces/AutoBidInterfaces";
import { addTask } from "@renderer/redux/autoBidCreationSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlusSm } from "react-icons/hi";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import InputField from "./InputField";

type FormInputs = {
	slug: string,
	priceLimit: number,
	percent: number,
}
export default function InputWrapper() {
	const [floorPrice, setFloorPrice] = useState(0);
	const [startBid, setStartBid] = useState(0);
	const { register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		setError,
		clearErrors,
		reset } = useForm<FormInputs>({
			defaultValues: {
				slug: '',
				priceLimit: 0,
				percent: 0
			},
		});
	const dispatch = useDispatch();
	const [debouncedSlug, isDebouncing] = useDebounce(watch('slug'), 740);
	const { isError, isFetching } = useQuery<SlugData, Error>(['autoBid', debouncedSlug], () => OpenSeaApiHandler.getSlugData(debouncedSlug),
		{
			enabled: !!debouncedSlug,
			retry: false,
			onSuccess(data) {
				setValue('priceLimit', data.startBid + 0.0001);
				setFloorPrice(data.floorPrice);
				setStartBid(data.startBid);
			},
			onError() {
				setError('slug', { type: 'invalidSlug' })
			}
		});

	useEffect(() => clearErrors('slug'), [isDebouncing])

	function onSubmit(data: FormInputs) {
		if (isFetching || isDebouncing) return;
		if (isError) setError('slug', { type: 'invalidSlug' });
		else {
			const task: InfoTask = { ...data, floorPrice, startBid };
			dispatch(addTask(task));
			reset({
				slug: '',
				priceLimit: 0,
				percent: 0
			})
			setFloorPrice(0)
			setStartBid(0)
		}
	}
	return (
		<Wrapper onSubmit={handleSubmit(onSubmit)} noValidate>
			<InputField
				divStyle={{ gridColumn: '1/3' }}
				label='Slug'
				register={register('slug', { required: true })}
				isError={!!errors.slug}
			/>
			<InputField
				divStyle={{ gridColumn: '3/5' }}
				label='Price Limit'
				type={'number'}
				min={0}
				step={0.0001}
				register={register('priceLimit', { required: true, min: 0 })}
				isError={!!errors.priceLimit}
			/>
			<InputField label='Floor Price' type={'number'} value={floorPrice} readOnly />
			<InputField label='Start Bid' type={'number'} value={startBid} readOnly />
			<InputField
				label='Percent'
				type={'number'}
				min={0}
				step={5}
				register={register('percent', { min: 0 })}
				isError={!!errors.percent}

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