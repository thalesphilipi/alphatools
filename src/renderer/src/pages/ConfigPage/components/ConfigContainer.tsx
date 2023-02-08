import ButtonWrapper from "@renderer/components/buttons/ButtonWrapper";
import { styled } from "@renderer/config/stitches.config";
import { useRef, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";

interface ConfigContainerProps {
    Icon: React.FC,
    children: string,
    secure?: boolean,
    configKey?: string,
    initialValue?: string,
    saveHandler?: (value: string) => void;
}
export default function ConfigContainer({ Icon, children, secure, initialValue = "", saveHandler}: ConfigContainerProps) {

    
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);
    const [pastValue, setPastValue] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);

    function startEdit() {
        setEditMode(true);
        setPastValue(inputValue);

        secure && setInputValue("");

        setTimeout(() => {
            const end = inputRef.current?.value.length;
            if (end) inputRef.current?.setSelectionRange(end, end);
            inputRef.current?.focus()
        }, 10)
    }
    function saveEdit() {
        setEditMode(false);
        saveHandler?.(inputValue);
    }
    function cancelEdit() {
        setInputValue(pastValue);
        setEditMode(false);
    }

    return (
        <Wrapper editing={editMode}>
            <InfoLine>
                <ConfigTitleBar>
                    <ConfigTitleIcon>
                        <Icon />
                    </ConfigTitleIcon>
                    <ConfigTitleText>
                        {children}
                    </ConfigTitleText>
                </ConfigTitleBar>
                <ConfigButtons>
                    {
                        editMode ?
                            <>
                                <SaveButton onClick={saveEdit}><IoMdSave /></SaveButton> <CancelButton onClick={cancelEdit}><CloseIcon /></CancelButton>
                            </>
                            :
                            <EditButton onClick={startEdit}><RiEdit2Fill /></EditButton>
                    }

                </ConfigButtons>
            </InfoLine>
            <Input ref={inputRef} onChange={(e) => setInputValue(e.target.value)} value={inputValue} type={(secure ? "password" : "text")} disabled={!editMode} />
        </Wrapper>
    )
}


const Wrapper = styled('div', {
    width: 595,
    background: '#2d3539',

    boxSizing: "border-box",

    padding: 13,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    WebkitUserSelect: 'none',

    variants: {
        editing: {
            true: {
                background: '#30383C'
            }
        }
    }
})

const InfoLine = styled('div', {
    display: "flex",
    height: 28,
    gap: 6,
})

const ConfigTitleBar = styled('div', {
    background: '#262d31',
    flexGrow: 1,
    borderRadius: 5,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
})

const ConfigTitleText = styled('p', {
    fontFamily: 'Work Sans',
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: '0.05em',

    color: '#999999',

    flexGrow: 1,
    display: "flex",

    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
})

const ConfigTitleIcon = styled('div', {
    width: 50,
    background: '#22282C',
    height: '100%',

    color: '#828587',

    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 19,
})

const ConfigButtons = styled('div', {
    width: 80,
    borderRadius: 5,
    display: 'flex',
    overflow: 'hidden',
    gap: 6,

})

const EditButton = styled(ButtonWrapper, {
    flexGrow: 1,
    borderRadius: 0,
    background: '#262d31',

    fontSize: 16,
    hover: {
        background: '#22282C',
    },
})
const SaveButton = styled(ButtonWrapper, {
    flexGrow: 1,
    borderRadius: 5,
    background: '#44704e',
    color: '#B3C0B6AA',
    fontSize: 16,
    hover: {
        background: '#44704eaa',

    },

})
const CancelButton = styled(ButtonWrapper, {
    flexGrow: 1,
    borderRadius: 5,
    background: '#AE5454AA',
    color: '#B3C0B6AA',

    fontSize: 16,
    hover: {
        background: '#AE545477',

    },
})
const CloseIcon = styled(TiCancel, {
    fontSize: 18,
})

const Input = styled('input', {
    border: 0,
    background: '#40494e',
    height: 35,
    borderRadius: 5,

    color: '#787C7F',

    fontFamily: 'Work Sans',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '0.15em',

    display: "flex",
    textAlign: 'center',

    "&:disabled": {
        pointerEvents: 'none',
        background: '#3a4448',
    }
})