import ButtonWrapper from "@renderer/components/ButtonWrapper"
import { styled } from "@renderer/config/stitches.config"
import { AiFillGold, AiOutlineClockCircle } from "react-icons/ai"
import { TiMediaPause } from "react-icons/ti"
import { BsFillPlayFill } from "react-icons/bs"
import { BotInstanceInterface as BotInstanceType } from "@renderer/interfaces/AutoBidInterfaces"
import formatTime from "@renderer/utils/formatTime"
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { startInstance, stopInstance } from "@renderer/redux/autoBid/autoBidInstancesSlice"
import SettingsContainer from "./SettingsContainer"

const zeros = (num) => String(num).padStart(2, '0');

export default function BotInstance({ id, running, tasks, timerCountSeconds: timerCount }: BotInstanceType) {

    const [isSelected, setIsSelected] = useState(false);
    const { hours, minutes, seconds } = useMemo(() => formatTime(timerCount), [timerCount]);
    const dispatch = useDispatch();

    function handleInstanceButton() {
        if (running) {
            dispatch(stopInstance(id));
        }
        else {
            dispatch(startInstance(id));
        }
    }
    return (

        <Wrapper>
            <ButtonContainer onClick={() => setIsSelected(!isSelected)} running={running} selected={isSelected}>
                <SlugPanelContainer running={running}>
                    {
                        [0, 0, 0, 0].map((_, index) =>
                            <SlugPanelCell key={index}>{tasks[index]?.slug}</SlugPanelCell>)
                    }
                </SlugPanelContainer>
                <SlugsCountContainer running={running}>
                    <SlugsCountIcon />
                    <SlugsCountValue>{tasks.length}</SlugsCountValue>
                </SlugsCountContainer>
                <StatusContainer>
                    <StatusTitle running={running}>{running ? "Running" : "Stopped"}</StatusTitle>
                    <StatusTimestampContainer running={running} >
                        <StatusTimestampIcon />
                        <StatusTimestampTime>{`${zeros(hours)}:${zeros(minutes)}:${zeros(seconds)}`}</StatusTimestampTime>
                    </StatusTimestampContainer>
                </StatusContainer>
                <InstanceButton running={running} onClick={(e) => [e.stopPropagation(), handleInstanceButton()]}>
                    {
                        running ?
                            <TiMediaPause />
                            :
                            <BsFillPlayFill />
                    }
                </InstanceButton>
            </ButtonContainer>
            <SettingsContainer tasks={tasks} instanceId={id} isRunning={running} hidden={!isSelected}/>
        </Wrapper>
    )
}

const Wrapper = styled('section', {
    width: 595,
    borderRadius: 10,
    overflow: "hidden",
    WebkitUserSelect: 'none',
    background: '#30383C',

    variants: {
        running: {
            true: {
                background: '#343D41',
                border: '2px solid #9FA3A514',
                padding: 8,
            }
        }
    }
})



const ButtonContainer = styled('div', {
    borderRadius: 10,
    height: 62,
    background: '#30383C',
    boxSizing: "border-box",
    padding: 10,
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: "pointer",

    hover: {
        background: '#343D41',
    },
    
    variants: {
        running: {
            true: {
                background: '#343D41',
                border: '2px solid #9FA3A514',
                padding: 8,
            }
        },
        selected: {
            true: { 
                background: '#343D41',
            }
        }
    }
})

const SlugPanelContainer = styled('div', {
    display: "grid",
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
    gap: 1,

    borderRadius: 6,
    overflow: "hidden",

    width: 327,
    height: '100%',

    variants: {
        running: {
            true: {
                '& p': {
                    color: '#B4B9BC99',
                    background: '#4D5559B2',
                }
            }
        }
    }
})
const SlugPanelCell = styled('p', {
    boxSizing: "border-box",
    padding: '0 10px',
    paddingTop: 2,

    background: '#3C4448',
    fontFamily: "'DM Sans'",
    fontWeight: 500,
    fontSize: "13px",
    letterSpacing: "-0.015em",
    color: "#666D71",

    whiteSpace: "nowrap",
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: 'center',

})

const SlugsCountContainer = styled('div', {
    display: 'flex',
    color: "#676D70",
    width: 50,
    justifyContent: "center",
    gap: 3,

    variants: {
        running: {
            true: {
                color: '#9FA3A5',
            }
        }
    }
})

const SlugsCountValue = styled('p', {
    fontFamily: "'DM Sans'",
    fontWeight: 600,
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "-0.015em",
})
const SlugsCountIcon = styled(AiFillGold, {
    fontSize: 22,
})

const StatusContainer = styled('div', {
    width: 100,
    display: "flex",
    flexDirection: 'column',

    alignItems: 'center',

    fontFamily: "'DM Sans'",
    fontWeight: 600,
    fontSize: "13px",
    textAlign: "center",
    letterSpacing: "0.105em",
    gap: 2
})

const StatusTitle = styled('p', {

    color: "#676D70",

    variants: {
        running: {
            true: {
                color: "#F0F0F0CC",
            }
        }
    }
})
const StatusTimestampContainer = styled('div', {
    minWidth: '80%',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    color: '#F0F0F026',
    overflow: 'hidden',
    variants: {
        running: {
            true: {
                color: '#F0F0F08C',
            }
        }
    }
})
const StatusTimestampIcon = styled(AiOutlineClockCircle, {

})
const StatusTimestampTime = styled('p', {
    fontWeight: 500,
    fontSize: 12,
})

const InstanceButton = styled(ButtonWrapper, {
    height: '100%',
    width: 48,
    borderRadius: 8,
    boxSizing: 'border-box',
    paddingLeft: 2,

    background: '#487457',
    color: '#F3F3F380',

    hover: {
        background: '#579767',
        color: '#F3F3F3B2',
    },

    variants: {
        running: {
            true: {
                background: '#AE5454',
                hover: {
                    background: '#AE5454B2',
                },
            }
        }
    }
})