<template>
  <div id="root">
    <planner-header/>
    <div class="mt-10" v-if="userId === null">
      <h1> Welcome to e-Planner </h1>
      <br>
      <h6> Please log in or sign up to proceed. </h6>
      <br>
      <div v-if="!$store.state.isUserLoggedIn">
        <v-btn flat light class='cyan'
         @click="navigateTo({name: 'register'})">
          Sign Up 
        </v-btn>
        <v-btn flat light class='cyan'
         @click="navigateTo({name: 'login'})">
          Login 
        </v-btn>
      </div>
    </div>
    <div v-else>
      <v-layout class='center'>
        <v-flex xs8 class='min-w20'>
          <!-- GOOD SHIT -->
          <div v-for="note in notes">
            <div v-if="userId === note.userId">
              <div v-if="note.completed == 'not completed'">
                <div v-if="note.overdue === 'overdueTrue'">
                  <overdue-panel :title="note.title" class="mb-4">
                    <h3>{{note.title}}</h3>
                    <p>Description: {{note.description}}</p>
                    <h6>Due Date: {{note.duedate}}</h6>
                    <br>
                    <v-btn class="red" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                  </overdue-panel>
                </div>
                <div v-else>
                  <planner-panel :title="note.title" class="mb-4">
                    <h3>{{note.title}}</h3>
                    <p>Description: {{note.description}}</p>
                    <h6>Due Date: {{note.duedate}}</h6>
                    <br>
                    <v-btn class="orange" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                  </planner-panel>
                </div>
              </div>  
            </div>
          </div>
          <div v-if="tasks === 0">
            <h1 class='mtop-3'>  </h1>
          </div>
          <div v-if="tasks === 0">
            <h1 class='mtop-3'> NO TASKS </h1>
            <p> Find something to do! </p>
          </div>
        </v-flex>
        <v-flex xs4>
          <planner-panel v-if="optBar" title="TASKS" class="side-bar ml-5">
            <v-btn class='opt-button' @click="navigateTo({name:'planner-create'})"> ADD TASK </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'weekly'})"> WEEKLY </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'planner-completed'})"> COMPLETED </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'overdue'})"> OVERDUE </v-btn>
          </planner-panel>
          <div class="side-bar ml-5 mtop-20">
            <a href='/#/completed'>
              <h5><br> COMPLETED <br></h5>
              <v-avatar
                class="light-green"
              >
              <v-icon dark>{{completed}}</v-icon>
              </v-avatar>
            </a>
            <a href='/#/planner'>
              <h5><br> TO DO <br></h5>
              <v-avatar
                class="orange"
              >
              <v-icon dark>{{tasks}}</v-icon>
              </v-avatar>
            </a>
            <a href='#/overdue'>
              <div class="link">
                <h5><br> OVERDUE <br></h5>
                <v-avatar
                  class="red"
                >
                <v-icon dark>{{overdue}}</v-icon>
                </v-avatar>
              </div>
            </a>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import PlannerHeader from '@/components/PlannerHeader'
import PlannerPanel from '@/components/PlannerPanel'
import OverduePanel from '@/components/OverduePanel'
import NotesService from '@/services/NotesService'

export default {
  components: {
    PlannerPanel,
    OverduePanel,
    PlannerHeader
  },
  data () {
    return {
      notes: null,
      noteId: null,
      userId: null,
      optBar: false,
      tasks: 0,
      completed: 0,
      dateToday: null,
      overdue: 0
    }
  },
  async mounted () {
    // do a request to the back end for all the notes
    // when mounted, this.notes will wait for NotesService.index() to retreive data
    this.notes = (await NotesService.index()).data
    this.notes.sort((a, b) => new Date(a.duedate) - new Date(b.duedate))
    if (this.$store.state.user !== null) { this.userId = this.$store.state.user.id }
    if (this.$store.state.user !== null) { this.optBar = true }
    this.dateToday = new Date()
    this.dateToday = this.dateToday.setHours(0, 0, 0, 0)
    console.log('date', this.dateToday)
    // RENDER TESTS
    console.log('ABC', this.abc)
    this.displayNumbers()
    console.log('tasks', this.tasks)
    console.log('overdue', this.overdue)
    console.log('this.dateToday', this.dateToday)
    // overdue array of ids
    console.log(this.overdueArray)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async displayNumbers () {
      for (let task of this.notes) {
        if (task.userId === this.userId) {
          if (task.completed === 'not completed') {
            this.tasks += 1
            if (new Date(task.duedate) < this.dateToday) {
              // push the id of the task into an array, if the id === one of the ids in the overdue array, then we render the red panel.
              task.overdue = 'overdueTrue'
              console.log('eyeyeyeye', task)
              this.overdue += 1
            }
          } else {
            this.completed += 1
          }
        }
      }
    }
  }
}

</script>


<style scoped>
a {
  text-decoration: none; 
  color: black; 
}
.mtop-20 {
  margin-top: 20em;
}
.mtop-3 {
  margin-top: 3em;
}
.mt-10 {
  margin-top: 10em;
}
h1, h2 {
  font-weight: normal;
}
.operations {
  min-width:100px;
}
.add-button {
      font-size:0.875em;
      display:block;
      left:-8px;
      width:100%;
      min-width:90%;
}
.min-w20 {
  min-width:20em;
}
.margin-ra {
  margin-right:2em;
}
.margin-la {
  margin-left:2em;
}
.margin-b20 {
  margin-bottom:20px
}
.margin-r20 {
  margin-right:30px
}
.margin-l30{
  margin-left:30px;
}
</style>
