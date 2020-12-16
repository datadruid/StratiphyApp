import Metrics from './Metrics'

const scale = (value) => {
	return value + (Metrics.screenWidth >= 375 ? 2 : 0) + (Metrics.screenWidth >= 414 ? 1 : 0)
}
const type = {
	roboto: 'Roboto',

}

const size = {
	h1: scale(34),
	
}

const style = (type, size, weight) => {
	return {
		fontFamily: type,
		fontSize: scale(size),
		fontWeight: weight,
		fontStyle: 'normal',
		
	}	
}
export default {
	type,
	size,
	style,
	
}
