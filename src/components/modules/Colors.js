import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

export const scale = size => {
	return (width / guidelineBaseWidth) * size
}
export const verticalScale = size => height / guidelineBaseHeight * size
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor

const metrics = {
	marginHorizontal: scale(10),
	marginVertical: scale(10),
	marginHorizontalIntro: scale(20),
	marginVerticalIntro: scale(20),
	section: 25,
	baseMargin: scale(10),
	baseMarginNewDes: scale(1),
	baseMarginSignUp: scale(10),
	baseMarginIntro: scale(20),
	baseMarginUploadImage: scale(30),
	baseMarginUploadImageBottomImages: scale(109),
	baseMarginforloader: scale(20),
	doubleBaseMargin: scale(20),
	verySmallMargin: scale(8),
	smallMargin: scale(5),
	doubleSection: 50,
	horizontalLineHeight: 1,
	screenWidth: width < height ? width : height,
	screenHeight: width < height ? height : width,
	navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
	buttonRadius: 4,
	inputHeight: scale(32),
	buttonHeight: scale(35),
	doubleButtonHeight: scale(60),
	icons: {
		micro: 10,
		tiny: 15,
		small: 20,
		medium: 30,
		large: 45,
		xl: 50
	},
	images: {
		small: 20,
		medium: 40,
		large: 60,
		logo: scale(200),
		logoNew: scale(50)
	}
}

export const colors = {

	blue: '#3B64CD',
	brownishOrange: '#de7717',
	darkSkyBlue: '#29aae2',
	paleGrey: '#f3f4f5',
	yellowTheme: '#ffc234',
	coolGrey: '#8d949d',
	white: '#FFFFFF',
	greyUnSelected: '#cbcbcb',
	silver: '#d8dadb',
	purplishBlue: '#7c40ff',
	lightishBlue: '#376cff',
	lightPurple: '#c670f5',
	redPink: '#fa325a',
	lightPurple: '#c770f5',
	paleGrey: '#f3f4f5',
	brownishGrey: '#666666',
	dark: '#120f20',
	paleGreyTwo: '#dbdee7',
	paleGreyThree: '#f2faf8',
	whiteTwo: '#e0e0e0',
	butterscotch: '#ffc234',
	borderDarkColor: '#707070',
	redPink: '#fa325a',
	lightPurple: '#c770f5',
	greenishTeal: '#4cd697',
	pinkishGrey: '#cbcbcb'

}

export const type = {
	roboto: 'Roboto',

}
