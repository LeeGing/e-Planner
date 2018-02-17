<template>
  <div id="root">
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
          <div class="elevation-1 height-500">
            <v-toolbar dark color="primary">
              <v-toolbar-title class="white--text">02/16/2018</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-md text-xs-center style="width:100%"
            class="outer"
            id="scroll-target">
              <v-layout row wrap
              style="width:100%">
                
                <div class="border-1 mtop-3">
                 <h1>hello</h1>
                </div>
                <div class="border-1 mtop-3">
                 <h1>hello</h1>
                </div>
                 <div class="border-1 mtop-3">
                 <h1>hello</h1>
                </div>
                 <div class="border-1 mtop-3">
                 <h1>hello</h1>
                </div>
                 <div class="border-1 mtop-3">
                 <h1>hello</h1>
                </div>
                 <div class="border-1 mtop-3">
                 <h1>hello</h1>
                </div>

              </v-layout>
            </v-container>
          </div>
          
        </v-flex>
        <v-flex xs4>
          <panel v-if="optBar" title="PLANNER" class="side-bar ml-5">
            <v-btn class='opt-button' @click="navigateTo({name:'planner-create'})"> ADD TASK </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'planner-completed'})"> COMPLETED </v-btn>
          </panel>
          <div class="side-bar ml-5 mtop-20">
            <h5><br> COMPLETED <br></h5>
            <v-avatar
              class="light-green"
            >
            <v-icon dark>{{completed}}</v-icon>
            </v-avatar>
            <h5><br> TO DO <br></h5>
            <v-avatar
              class="orange"
            >
            <v-icon dark>{{tasks}}</v-icon>
            </v-avatar>
            <h5><br> OVERDUE <br></h5>
            <v-avatar
              class="red"
            >
            <v-icon dark>{{overdue}}</v-icon>
            </v-avatar>
          </div>
        </v-flex>
      </v-layout>
    </div>

  </div>
</template>

<script>
import Panel from '@/components/Panel'
import NotesService from '@/services/NotesService'
export default {
  components: {
    Panel
  },
  data () {
    return {
      notes: null,
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
    console.log('date', this.dateToday)
    // RENDER TESTS
    console.log('ABC', this.abc)
    this.displayNumbers()
    console.log('tasks', this.tasks)
    console.log('overdue', this.overdue)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    displayNumbers () {
      for (let task of this.notes) {
        if (task.userId === this.userId) {
          if (task.completed === 'not completed') {
            this.tasks += 1
            if (new Date(task.duedate) < this.dateToday) {
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
.outer{
  width:500px;
  height:70%;
  white-space: nowrap;
  position: relative;
  overflow-x:scroll;
  overflow-y:hidden;
}

.outer div{
  width: 24.5%;
  background-color:;
  float: none;
  height: 90%;
  margin: 0 0.25%;
  display: inline-block;
  zoom: 1;
}
.m-auto {
  margin-top:auto;
}
.height-500 {
  height: 250px;
}
.border-1 {
  border: 1px solid black;
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
