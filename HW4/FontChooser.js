class FontChooser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isBold : this.props.bold == 'true',
									isHidden : true,
								 size : parseInt(this.props.size)};
		
	}
	
	toggle() {
		this.state.isHidden = ! this.state.isHidden;
		var formElements = document.getElementsByClassName("form");
		if (this.state.isHidden) {
			for (let element of formElements) {
				element.setAttribute('hidden', true);
			}
		} else {
			for (let element of formElements) {
				element.removeAttribute('hidden');
			}
		}
	}
	
  
	render() {
		var weight = this.state.isBold ? 'bold' : 'normal';
		var inlineStyles = {fontSize: this.state.size, fontWeight : weight};	

		return (
			<div>
				<input class="form" type="checkbox" id="boldCheckbox" hidden='true'/>
				<button class="form" id="decreaseButton" hidden='true'>-</button>
				<span class="form" id="fontSizeSpan" hidden='true'>{this.props.size}</span>
				<button class="form" id="increaseButton" hidden='true'>+</button>
				<span id="textSpan" style={inlineStyles} onClick={this.toggle.bind(this)}>{this.props.text}</span>
				
				<span>{typeof this.state.size}</span>
				<span id='test'>aaa</span>
			</div>
		);
	}
}

