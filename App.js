import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Platform, ScrollView, Dimensions } from 'react-native';
import { AppLoading } from 'expo';
import ToDo from './ToDo';
import uuidv1 from 'uuid/v1';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
	state = {
        newToDo: '',
        loadedToDo: false,
    };
    componentDidMount() {
        this._loadToDo();
    }
	render() {
        const { newToDo, loadedToDo } = this.state;

        if (!loadedToDo) {
            return (<AppLoading />);
        }
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Text style={styles.title}>Kawai To Do</Text>
				<View style={styles.card}>
					<TextInput
						style={styles.input}
						value={newToDo}
						placeholder={'New To Do'}
						onChangeText={this._controlleNewToDo}
						placeholderTextColor={'#999'}
						returnKeyType={'done'}
                        autoCorrect={false}
                        onSubmitEditing={this._addTodo}
					/>
					<ScrollView contentContainerStyle={styles.todo} >
						<ToDo text={'hello'}/>
					</ScrollView>
				</View>
			</View>
		);
	}

	_controlleNewToDo = text => {
		this.setState({
			newToDo: text,
		});
    };
    
    _loadToDo = () => {
        this.setState({
            loadedToDo: true,
        });
    }

    _addToDo = () => {
        const { newToDo } = this.state;
        if(newToDo !== '') {
            this.setState({
                newToDo: ''
            });
            this.setState((prevState) => {
                const ID = uuidv1();
                
            });
            const toDo = {
                1234: {
                    id: 1234,
                    text: 'buy something',
                    isCompleted: false,
                    date: 12312423,
                },
            };
        }
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f23657',
		alignItems: 'center',
	},
	title: {
		color: 'white',
		fontSize: 30,
		marginTop: 50,
		fontWeight: '200',
		marginBottom: 30,
	},
	card: {
		backgroundColor: 'white',
		flex: 1,
		width: width - 25,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		...Platform.select({
			ios: {
				shadowColor: 'rgba(50, 50, 50, 1.0)',
				shadowOpacity: 0.5,
				shadowRadius: 5,
				shadowOffset: {
					height: -1,
					width: 0,
				},
			},
			android: {
				elevation: 3,
			},
		}),
	},
	input: {
		padding: 20,
		borderBottomColor: '#bbb',
		borderBottomWidth: 1,
		fontSize: 25,
    },
    todo: {
        alignItems: 'center',
    },
});
