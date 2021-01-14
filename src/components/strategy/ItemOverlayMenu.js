import React, { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Context as StrategyContext } from '../../context/StrategyContext';
import Spinner from 'react-native-loading-spinner-overlay';

const ItemOverlayMenu = ({ navigation, item }) => {
    const { deleteStrategy, listStrategies } = useContext(StrategyContext);
    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const createTwoButtonAlert = (item) =>
        Alert.alert(
            "Delete strategy",
            "are you sure you want to delete this strategy?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        setSpinnerVisible(true);
                        let timer = setTimeout(() => {
                            Alert.alert('Timed out', 'the delete action took to long, please try again.');
                            setSpinnerVisible(false);
                        }, 10000);

                        await deleteStrategy(item._id);
                        await listStrategies(false);
                        clearTimeout(timer);
                        setSpinnerVisible(false);
                    }
                }
            ],
            { cancelable: false }
        );

    const onItemSelect = (index) => {
        switch (index.row) {
            case 0:
                navigation.navigate('StrategySetting', { item: item });
                // setStrategy(item);
                // navigation.navigate('StrategyWizard', { pageNo: 1});
                break;
            case 1:
                console.log('follow');
                break;
            case 2:
                createTwoButtonAlert(item);
                break;

        }
        setVisible(false);
    };


    const showMenu = (item) => {
        setVisible(true);
    };

    const renderToggleButton = () => (
        <TouchableOpacity style={styles.touch} onPress={() => showMenu(item)}>
            <Icon style={styles.iconright} size={18} name='ellipsis-v' />
        </TouchableOpacity>
    );

    const EditIcon = (props) => (
        <Icon {...props} size={20} name='pencil' />
    );

    const TickIcon = (props) => (
        <Icon {...props} size={20} name='check-square-o' />
    );

    const DeleteIcon = (props) => (
        <Icon {...props} size={20} name='trash' />
    );

    return (
        <View style={styles.container} level='1'>
            <Spinner
                visible={spinnerVisible}
                textContent={'Deleting...'}
                textStyle={styles.spinnerTextStyle}
            />
            <OverflowMenu
                style={styles.overflowmenu}
                anchor={renderToggleButton}
                backdropStyle={styles.backdrop}
                visible={visible}
                selectedIndex={selectedIndex}
                onSelect={onItemSelect}
                onBackdropPress={() => setVisible(false)}>
                <MenuItem style={styles.menuitem} title='Edit Strategy' accessoryRight={EditIcon} />
                <MenuItem style={styles.menuicon} title='Follow Strategy' accessoryRight={TickIcon} />
                <MenuItem style={styles.menuicon} title='Delete Strategy' accessoryRight={DeleteIcon} />
            </OverflowMenu>
        </View>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    iconright: {
        alignSelf: 'flex-end',
        padding: 7,
        color: '#CBCBCB'
    },
    touch: {
        width: 40,
        alignContent: 'flex-end'
    },
    overflowmenu: {
        width: 180
    },
    menuitem: {
        fontSize: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default ItemOverlayMenu;