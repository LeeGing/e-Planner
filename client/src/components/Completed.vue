<template>
  <div class="top page">
    <v-layout class='center'>
      <v-flex xs8 class='min-w20'>
        <div v-for="note in notes">
          <div v-if="userId === note.userId">
            <div v-if="note.completed !== 'not completed'">
              <complete :title="note.title" class="mb-4 panel">
                <h3>{{note.title}}</h3>
                <p>{{note.description}}</p>
                <!-- <h6>{{note.duedate}}</h6> -->
                <h6>Date Completed: {{note.completed}}</h6>
                <v-btn class="light-green mtop-1" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
              </complete>
            </div>  
          </div>
        </div>
      </v-flex>
      <v-flex xs4>
        <complete v-if="optBar" title="COMPLETED" class="side-bar ml-5">
          <v-btn class='opt-button' @click="navigateTo({name:'planner'})"> PLANNER </v-btn>
          <v-btn class='opt-button' @click="navigateTo({name:'planner-completed'})"> COMPLETED </v-btn>
        </complete>
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
</template>

<script>
import Panel from '@/components/Panel'
import Complete from '@/components/Complete'
import NotesService from '@/services/NotesService'
export default {
  components: {
    Panel,
    Complete
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
    this.notes.sort((a, b) => new Date(b.duedate) - new Date(a.duedate))
    this.dateToday = new Date()
    this.dateToday = this.dateToday.setHours(0, 0, 0, 0)
    if (this.$store.state.user !== null) { this.userId = this.$store.state.user.id }
    if (this.$store.state.user !== null) { this.optBar = true }
    this.displayNumbers()
    console.log(this.notes)
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
.mtop-1 {
  margin-top:1em;
}
.operations {
  min-width:30%;
}
.add-button {
      font-size:0.875em;
      display:block;
      left:-8px;
      margin-top:35px;
      width:100%;
}
.min-w20 {
  min-width:20em;
}
.margin-a {
  margin:auto;
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
.panel {
  height: 250px;
}
</style>
