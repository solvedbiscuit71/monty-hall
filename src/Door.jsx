import './Door.css'

function Door({doorNo, selected, show, objectSrc, handleClick}) {
	return (
		<div className='door-container'>
			<div className='door-no'><b>{doorNo}</b></div>
			<div className='door' onClick={handleClick}>
				<img className='object' src={objectSrc}/>
				<div className='divider' style={{display: show ? 'none' : 'block' }} />
				<img className='indicator' src={selected ? '/selected.svg' : '/not-selected.svg'} style={{display: show ? 'none' : 'block' }} />
			</div>
		</div>
	)
}

export default Door
