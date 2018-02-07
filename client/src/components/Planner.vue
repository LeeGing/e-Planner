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
    <v-layout class='center'>
      <v-flex xs8 class='min-w20'>
        <div v-for="note in notes">
          <div v-if="userId === note.userId">
            <div v-if="note.completed !== true">
              <panel :title="note.title" class="mb-4">
                <h3>{{note.title}}</h3>
                <p>Description: {{note.description}}</p>
                <h6>Due Date: {{note.duedate}}</h6>
                <v-btn class="cyan" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
              </panel>
            </div>  
          </div>
        </div>
      </v-flex>
      <v-flex xs4>
        <panel v-if="optBar" title="PLANNER" class="side-bar ml-5">
          <v-btn class='opt-button' @click="navigateTo({name:'planner-create'})"> ADD TASK </v-btn>
          <v-btn class='opt-button' @click="navigateTo({name:'planner-completed'})"> COMPLETED </v-btn>
        </panel>
      </v-flex>
    </v-layout>
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
      optBar: false
    }
  },
  async mounted () {
    // do a request to the back end for all the notes
    // when mounted, this.notes will wait for NotesService.index() to retreive data
    this.notes = (await NotesService.index()).data
    if (this.$store.state.user !== null) { this.userId = this.$store.state.user.id }
    if (this.$store.state.user !== null) { this.optBar = true }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}

</script>


<style scoped>
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
