import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Platform, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import ToDo from './ToDo';
import uuidv1 from 'uuid/v1';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
	state = {
		newToDo: '',
		loadedToDo: false,
		toDos: {},
	};
	componentDidMount() {
		this._loadToDo();
	}
	render() {
		const { newToDo, loadedToDo, toDos } = this.state;
		if (!loadedToDo) {
			return <AppLoading />;
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
						onEndEditing={this._addToDo}
						onSubmitEditing={this._addTodo}
					/>
					<ScrollView contentContainerStyle={styles.todo}>
						{Object.values(toDos).reverse().map(toDo => (
							<ToDo
								key={toDo.id}
								id={toDo.id}
								text={toDo.text}
								isCompleted={toDo.isCompleted}
                                deleteToDo={this._deleteToDo}
                                toggleToDo={this._toggleToDo}
                                updateToDo={this._updateToDo}
							/>
						))}
					</ScrollView>
				</View>
			</View>
		);
	}

	_controlleNewToDo = (text) => {
		this.setState({
			newToDo: text,
		});
	};

	_loadToDo = async () => {
        try {
            const getToDos = await AsyncStorage.getItem('toDos');
        } catch (err) {
            console.log(err);
        }
		this.setState({
            loadedToDo: true,
            toDos: JSON.parse(getToDos),
		});
	};

	_addToDo = () => {
		const { newToDo } = this.state;
		if (newToDo !== '') {
			this.setState(prevState => {
				const ID = uuidv1();
				const newToDoObject = {
					[ID]: {
						id: ID,
						isCompleted: false,
						text: prevState.newToDo,
						createdAt: Date.now(),
					},
				};
				const newState = {
					...prevState,
					newToDo: '',
					toDos: {
						...prevState.toDos,
						...newToDoObject,
					},
				};
                this._saveToDos(newState.toDos);
				return { ...newState };
			});
		}
	};

	_deleteToDo = (id) => {
		this.setState(prevState => {
			const toDos = prevState.toDos;
			delete toDos[id];
			const newState = {
				...prevState,
				...toDos,
			};
            this._saveToDos(newState.toDos);
			return newState;
		});
	};

	_toggleToDo = (id) => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				toDos: {
					...prevState.toDos,
					[id]: {
						...prevState.toDos[id],
						isCompleted: !prevState.toDos[id].isCompleted,
					},
				},
			};
            this._saveToDos(newState.toDos);
			return { ...newState };
		});
    };
    
    _updateToDo = (id, text) => {
        this.setState(prevState => {
			const newState = {
				...prevState,
				toDos: {
					...prevState.toDos,
					[id]: {
						...prevState.toDos[id],
						text,
					},e
				},
            };
            this._saveToDos(newState.toDos);
			return { ...newState };
		});
    }

    _saveToDos = async (newToDos) => {
        try {
            const saveToDos = await AsyncStorage.setItem('toDos', JSON.stringify(newToDos));
        } catch (err) {
            console.log(err);
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
