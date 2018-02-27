<template>
  <div id="root">
    <week-header/>
    <div class="mtop-10e" v-if="userId === null">
      <h1> Welcome to e-Planner </h1>
      <br>
      <h6> Please log in or sign up to proceed. </h6>
      <br>
      <div v-if="!$store.state.isUserLoggedIn">
        <v-btn flat light class='blue'
         @click="navigateTo({name: 'register'})">
          Sign Up 
        </v-btn>
        <v-btn flat light class='blue'
         @click="navigateTo({name: 'login'})">
          Login 
        </v-btn>
      </div>
    </div>
    <div v-else>
      <v-layout class='center'>
        <v-flex xs8 class='min-w20e'>

          <div class="elevation-2 mb-4 height-500">
            <v-toolbar dark flat dense color="blue">
              <v-toolbar-title>{{d1}}</v-toolbar-title>
              <v-toolbar-title class="ml-auto">TASKS: {{d1n}}</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-md text-xs-center style="width:100%"
            class="outer"
            id="scroll-target">
              <v-layout row wrap
              style="width:100%">
                <div v-for="note in d1a">
                  <div v-if="note.duedate == d1">
                    <div v-if="userId === note.userId">
                      <div v-if="note.completed === 'not completed'">
                        <div class="mright-30 mleft-20 mtop-10">
                          <h4>{{note.title}}</h4>
                          <h6>Due: {{note.duedate}}</h6>
                          <v-btn class="blue" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
                <div v-if="d1n === 0" class="mtop-4e">
                  <h5> NO TASKS </h5>
                </div>
              </v-layout>
            </v-container>
          </div>
          <div class="elevation-2 mb-4 height-500">
            <v-toolbar dark flat dense color="blue ">
              <v-toolbar-title>{{d2}}</v-toolbar-title>
              <v-toolbar-title class="ml-auto">TASKS: {{d2n}}</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-md text-xs-center style="width:100%"
            class="outer"
            id="scroll-target">
              <v-layout row wrap
              style="width:100%">
                <div v-for="note in d2a">
                  <div v-if="note.duedate == d2">
                    <div v-if="userId === note.userId">
                      <div v-if="note.completed === 'not completed'">
                        <div class="mright-30 mleft-20 mtop-10">
                          <h4>{{note.title}}</h4>
                          <h6>Due: {{note.duedate}}</h6>
                          <v-btn class="blue" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
                <div v-if="d2n === 0" class="mtop-4e">
                  <h5> NO TASKS </h5>
                </div>
              </v-layout>
            </v-container>
          </div>
          <div class="elevation-2 mb-4 height-500">
            <v-toolbar dark flat dense color="blue ">
              <v-toolbar-title>{{d3}}</v-toolbar-title>
              <v-toolbar-title class="ml-auto">TASKS: {{d3n}}</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-md text-xs-center style="width:100%"
            class="outer"
            id="scroll-target">
              <v-layout row wrap
              style="width:100%">
                <div v-for="note in d3a">
                  <div v-if="note.duedate == d3">
                    <div v-if="userId === note.userId">
                      <div v-if="note.completed === 'not completed'">
                        <div class="mright-30 mleft-20 mtop-10">
                          <h4>{{note.title}}</h4>
                          <h6>Due: {{note.duedate}}</h6>
                          <v-btn class="blue" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
                <div v-if="d3n === 0" class="mtop-4e">
                  <h5> NO TASKS </h5>
                </div>
              </v-layout>
            </v-container>
          </div>
          <div class="elevation-2 mb-4 height-500">
            <v-toolbar dark flat dense color="blue ">
              <v-toolbar-title>{{d4}}</v-toolbar-title>
              <v-toolbar-title class="ml-auto">TASKS: {{d4n}}</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-md text-xs-center style="width:100%"
            class="outer"
            id="scroll-target">
              <v-layout row wrap
              style="width:100%">
                <div v-for="note in d4a">
                  <div v-if="note.duedate == d4">
                    <div v-if="userId === note.userId">
                      <div v-if="note.completed === 'not completed'">
                        <div class="mright-30 mleft-20 mtop-10">
                          <h4>{{note.title}}</h4>
                          <h6>Due: {{note.duedate}}</h6>
                          <v-btn class="blue" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
                <div v-if="d4n === 0" class="mtop-4e">
                  <h5> NO TASKS </h5>
                </div>
              </v-layout>
            </v-container>
          </div>
          <div class="elevation-2 mb-4 height-500">
            <v-toolbar dark flat dense color="blue ">
              <v-toolbar-title>{{d5}}</v-toolbar-title>
              <v-toolbar-title class="ml-auto">TASKS: {{d5n}}</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-md text-xs-center style="width:100%"
            class="outer"
            id="scroll-target">
              <v-layout row wrap
              style="width:100%">
                <div v-for="note in d5a">
                  <div v-if="note.duedate == d5">
                    <div v-if="userId === note.userId">
                      <div v-if="note.completed === 'not completed'">
                        <div class="mright-30 mleft-20 mtop-10">
                          <h4>{{note.title}}</h4>
                          <h6>Due: {{note.duedate}}</h6>
                          <v-btn class="blue" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
                <div v-if="d5n === 0" class="mtop-4e">
                  <h5> NO TASKS </h5>
                </div>
              </v-layout>
            </v-container>
          </div>
          <div class="elevation-2 mb-4 height-500">
            <v-toolbar dark flat dense color="blue ">
              <v-toolbar-title>{{d6}}</v-toolbar-title>
              <v-toolbar-title class="ml-auto">TASKS: {{d6n}}</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-md text-xs-center style="width:100%"
            class="outer"
            id="scroll-target">
              <v-layout row wrap
              style="width:100%">
                <div v-for="note in d6a">
                  <div v-if="note.duedate == d6">
                    <div v-if="userId === note.userId">
                      <div v-if="note.completed === 'not completed'">
                        <div class="mright-30 mleft-20 mtop-10">
                          <h4>{{note.title}}</h4>
                          <h6>Due: {{note.duedate}}</h6>
                          <v-btn class="blue" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
                <div v-if="d6n === 0" class="mtop-4e">
                  <h5> NO TASKS </h5>
                </div>
              </v-layout>
            </v-container>
          </div>
          <div class="elevation-2 mb-4 height-500">
            <v-toolbar dark flat dense color="blue ">
              <v-toolbar-title>{{d7}}</v-toolbar-title>
              <v-toolbar-title class="ml-auto">TASKS: {{d7n}}</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-md text-xs-center style="width:100%"
            class="outer"
            id="scroll-target">
              <v-layout row wrap
              style="width:100%">
                <div v-for="note in d7a">
                  <div v-if="note.duedate == d7">
                    <div v-if="userId === note.userId">
                      <div v-if="note.completed === 'not completed'">
                        <div class="mright-30 mleft-20 mtop-10">
                          <h4>{{note.title}}</h4>
                          <h6>Due: {{note.duedate}}</h6>
                          <v-btn class="blue" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
                <div v-if="d7n === 0" class="mtop-4e">
                  <h5> NO TASKS </h5>
                </div>
              </v-layout>
            </v-container>
          </div>


        </v-flex>
        <v-flex xs4>
          <week-panel v-if="optBar" title="WEEKLY" class="side-bar ml-5">
            <v-btn class='opt-button' @click="navigateTo({name:'planner-create'})"> ADD TASK </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'planner'})"> TASKS </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'planner-completed'})"> COMPLETED </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'overdue'})"> OVERDUE </v-btn>
          </week-panel>
          <div class="side-bar ml-5 mtop-20e">
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

        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import WeekPanel from '@/components/WeekPanel'
import WeekHeader from '@/components/WeekHeader'
import NotesService from '@/services/NotesService'
export default {
  components: {
    WeekPanel,
    WeekHeader
  },
  data () {
    return {
      notes: null,
      userId: null,
      optBar: false,
      tasks: 0,
      completed: 0,
      dateSet: null,
      overdue: 0,
      // weekly dates
      d0: '',
      d1: '',
      d2: '',
      d3: '',
      d4: '',
      d5: '',
      d6: '',
      d7: '',
      d1a: [],
      d1n: 0,
      d2a: [],
      d2n: 0,
      d3a: [],
      d3n: 0,
      d4a: [],
      d4n: 0,
      d5a: [],
      d5n: 0,
      d6a: [],
      d6n: 0,
      d7a: [],
      d7n: 0
    }
  },
  async mounted () {
    // do a request to the back end for all the notes
    // when mounted, this.notes will wait for NotesService.index() to retreive data
    this.notes = (await NotesService.index()).data
    this.notes.sort((a, b) => new Date(a.duedate) - new Date(b.duedate))
    if (this.$store.state.user !== null) { this.userId = this.$store.state.user.id }
    if (this.$store.state.user !== null) { this.optBar = true }
    // weekly dates set
    this.dateSet = new Date()
    this.dateSet = this.dateSet.setHours(0, 0, 0, 0)
    this.dateSet = new Date(this.dateSet)
    this.d0 = this.dateSet
    this.d1 = new Date()
    this.d1 = this.d1.setHours(0, 0, 0, 0)
    this.d1 = new Date(this.d1)
    this.d2 = this.dateSet.setDate(this.d0.getDate() + 1)
    this.d3 = this.dateSet.setDate(this.d0.getDate() + 1)
    this.d4 = this.dateSet.setDate(this.d0.getDate() + 1)
    this.d5 = this.dateSet.setDate(this.d0.getDate() + 1)
    this.d6 = this.dateSet.setDate(this.d0.getDate() + 1)
    this.d7 = this.dateSet.setDate(this.d0.getDate() + 1)
    this.d2 = new Date(this.d2)
    this.d3 = new Date(this.d3)
    this.d4 = new Date(this.d4)
    this.d5 = new Date(this.d5)
    this.d6 = new Date(this.d6)
    this.d7 = new Date(this.d7)
    this.d1 = (this.d1.getMonth() + 1) + '/' + this.d1.getDate() + '/' + this.d1.getFullYear()
    this.d2 = (this.d2.getMonth() + 1) + '/' + this.d2.getDate() + '/' + this.d2.getFullYear()
    this.d3 = (this.d3.getMonth() + 1) + '/' + this.d3.getDate() + '/' + this.d3.getFullYear()
    this.d4 = (this.d4.getMonth() + 1) + '/' + this.d4.getDate() + '/' + this.d4.getFullYear()
    this.d5 = (this.d5.getMonth() + 1) + '/' + this.d5.getDate() + '/' + this.d5.getFullYear()
    this.d6 = (this.d6.getMonth() + 1) + '/' + this.d6.getDate() + '/' + this.d6.getFullYear()
    this.d7 = (this.d7.getMonth() + 1) + '/' + this.d7.getDate() + '/' + this.d7.getFullYear()
    console.log('d1', this.d1)
    console.log('d2', this.d2)
    console.log('d3', this.d3)
    console.log('d4', this.d4)
    console.log('d5', this.d5)
    console.log('d6', this.d6)
    console.log('d7', this.d7)
    this.displayNumbers()
    this.weekly()
    console.log(this.d1a)
    console.log(this.overdue)
    console.log('this.d1', this.d1)
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
            if (new Date(task.duedate) < new Date(this.d1)) {
              this.overdue += 1
            }
          } else {
            this.completed += 1
          }
        }
      }
    },
    weekly () {
      for (let task of this.notes) {
        if (task.userId === this.userId) {
          if (task.completed === 'not completed') {
            if (task.duedate === this.d1) {
              this.d1a.push(task)
              this.d1n += 1
            }
            if (task.duedate === this.d2) {
              this.d2a.push(task)
              this.d2n += 1
            }
            if (task.duedate === this.d3) {
              this.d3a.push(task)
              this.d3n += 1
            }
            if (task.duedate === this.d4) {
              this.d4a.push(task)
              this.d4n += 1
            }
            if (task.duedate === this.d5) {
              this.d5a.push(task)
              this.d5n += 1
            }
            if (task.duedate === this.d6) {
              this.d6a.push(task)
              this.d6n += 1
            }
            if (task.duedate === this.d7) {
              this.d7a.push(task)
              this.d7n += 1
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.mtop-4e {
  margin-top: 4em;
}
.mtop-10 {
  margin-top:10px;
}
.mbot-20 {
  margin-bottom: 2px;
}
a {
  text-decoration: none; 
  color: black; 
}
.mleft-20 {
  margin-left: 20px;
}
.mright-30 {
  margin-right: 30px;
}
.outer{
  width:500px;
  height:70%;
  white-space: nowrap;
  position: relative;
  overflow-x:scroll;
  overflow-y:hidden;
}
.outer div{
  background-color:;
  float: none;
  height: 90%;
  display: inline-block;
  zoom: 1;
}
.height-500 {
  height: 250px;
}
.border-1 {
  border: 1px solid black;
}
.mtop-20e {
  margin-top: 20em;
}
.mtop-3 {
  margin-top: 3em;
}
.mtop-10e {
  margin-top: 10em;
}
h1, h2 {
  font-weight: normal;
}
.min-w20e {
  min-width:20em;
}
</style>
