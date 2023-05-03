'use client';


interface ButtonProps {
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    onClick: () => void;
    disabled?: boolean;
    outline?: boolean
}

const Button : React.FC<ButtonProps> = ({
    label,
    secondary,
    fullWidth,
    large,
    onClick,
    disabled,
    outline
}) => {
    return (
        <button
            disabled={disabled}
            className={
                `disabled:opacity-70 hover:opacity-80
                disabled: cursor-not-allowed
                rounded-full font-semibold transition
                border-2 ${fullWidth ? 'w-full' : 'w-fit'}
                ${secondary ? 'bg-white' : 'bg-sky-500'}
                ${secondary ? 'text-black' : 'text-white'}
                ${secondary ? 'text-xl' : 'text-md'}
                ${large} ? 'text-xl' : 'text-md'
                ${large ? 'px-5' : 'px-4'}
                ${large ? 'py-3' : 'py:2'}
                ${outline ? 'bg-transparent' : ''}
                ${outline ? 'border-white' : ''}
                `

            } 
        >
            {label}
        </button>
    )
}