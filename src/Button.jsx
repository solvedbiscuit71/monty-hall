import './Button.css'

function Button({onClick}) {
	return (
		<button className='button'>
			<img onClick={onClick} src='/arrow.svg'/>
		</button>
	)
}

export default Button
