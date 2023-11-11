const userModule = {
    state: {
      user: {
      },
      tasks: [
      ],
    },
    getters: {
      tasksLength: state => state.tasks.length,
      logged: state => state.user.id !== '',
      userId: state => state.user.id,
    },
    mutations: {
      SET_USER(state, data) {
        console.log('user has changed...');
        state.user = data;
      },
      SET_TASKS(state, data) {
        console.log('tasks have changed...');
        state.tasks = data;
      },
      
    },
    actions: {
    }
  };
  
  export default userModule;