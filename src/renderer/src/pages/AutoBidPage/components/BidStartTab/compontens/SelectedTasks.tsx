import ButtonWrapper from "@renderer/components/ButtonWrapper";
import { styled } from "@renderer/config/stitches.config";
import { removeTask, selectAutoBidCreation } from "@renderer/redux/autoBidCreationSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgTrash } from 'react-icons/cg'




export default function SelectedTasks() {
    const tasks = useSelector(selectAutoBidCreation).addedTasks;

    const dispatch = useDispatch();


    return (
        <Wrapper visible={tasks.length > 0}>
            <thead>
                <tr>
                    <td>
                        <THeader >
                            <tbody>
                                <TRow>
                                    <THeaderElement css={{ width: '35%' }} >Slug</THeaderElement>
                                    <THeaderElement css={{ width: '16%' }}>Start Bid</THeaderElement>
                                    <THeaderElement css={{ width: '16%' }}>Price Limit</THeaderElement>
                                    <THeaderElement css={{ width: '16%' }}>Floor Price</THeaderElement>
                                    <THeaderElement css={{ width: '10%' }}>Percent</THeaderElement>
                                    <THeaderElement></THeaderElement>
                                </TRow>
                            </tbody>

                        </THeader>
                    </td>
                </tr>

            </thead>

            <tbody>
                <tr>
                    <td>
                        <DataContainer>
                            <TBody>
                                <tbody>
                                    {
                                        tasks?.map((task, index) => {
                                            return (
                                                <TRow key={index}>
                                                    <TData css={{ width: '35%' }}>{task.slug}</TData>
                                                    <TData css={{ width: '16%' }}>{task.startBid.toLocaleString(navigator.language, { maximumFractionDigits: 4 })}</TData>
                                                    <TData css={{ width: '16%' }}>{task.priceLimit.toLocaleString(navigator.language, { maximumFractionDigits: 4 })}</TData>
                                                    <TData css={{ width: '16%' }}>{task.floorPrice.toLocaleString(navigator.language, { maximumFractionDigits: 4 })}</TData>
                                                    <TData css={{ width: '10%' }}>{task.percent}</TData>
                                                    <TData onClick={() => dispatch(removeTask(index))}><DeleteButton> <CgTrash /></DeleteButton></TData>
                                                </TRow>
                                            )
                                        })
                                    }
                                </tbody>


                            </TBody>
                        </DataContainer>
                    </td>

                </tr>

            </tbody>



        </Wrapper>
    )
}


const Wrapper = styled('table', {
    responsiveWidth: 597,
    borderRadius: 5,
    borderCollapse: 'collapse',
    overflow: 'hidden',
    borderStyle: "hidden",
    display: 'none',
    tableLayout: 'fixed',

    background: '#282F33',
    '@sm': {
        maxWidth: "unset",
    },
    variants: {
        visible: {
            true: {
                display: "table",
            }
        }
    }
})


const DataContainer = styled('div', {
    maxHeight: 270,
    overflowY: 'scroll',
    "&::-webkit-scrollbar": {
        display: 'none',
    },
    '@sm': {
        maxHeight: '74vh',
    }
})
const THeader = styled('table', {
    background: '#232A2E',
    height: 30,
    width: '100%',
    borderCollapse: 'collapse',
    overflow: 'hidden',
    borderStyle: "hidden",
    tableLayout: 'fixed',
})

const TRow = styled('tr', {

})
const THeaderElement = styled('th', {
    border: "1px solid #1F272A",
    fontFamily: "'Work Sans'",
    fontWeight: 600,
    fontSize: 11,
    textAlign: "center",
    letterSpacing: "0.145em",
    color: '#FFFFFF9C'
})

const TBody = styled('table', {
    width: '100%',
    borderCollapse: 'collapse',
    overflow: 'hidden',
    borderStyle: "hidden",
    tableLayout: 'fixed',
})

const TData = styled('td', {
    border: "1px solid #2B3337",
    height: 35,
    overflow: 'hidden',

    fontFamily: "DM Sans",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.145em",
    textAlign: "center",
    color: '#C0C0C0B5',
})
const DeleteButton = styled(ButtonWrapper, {
    borderRadius: 0,
    background: '#AE5454',
    width: '100%',
    height: '100%',
    color: '#CEBFBF',
    fontSize: 16,
})