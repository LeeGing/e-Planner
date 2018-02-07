<template>
  <div class="top page">
    <v-layout class='center'>
      <v-flex xs8 class='min-w20'>
        <div v-for="note in notes">
          <div v-if="userId === note.userId">
            <div v-if="note.completed === true">
              <panel :title="note.title" class="mb-4">
                <h1>{{note.title}}</h1>
                <p>{{note.description}}</p>
                <h6>{{note.duedate}}</h6>
                <v-btn class="cyan" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
              </panel>
            </div>  
          </div>
        </div>
      </v-flex>
      <v-flex xs4>
        <panel v-if="optBar" title="COMPLETED" class="side-bar ml-5">
          <v-btn class='opt-button' @click="navigateTo({name:'planner'})"> PLANNER </v-btn>
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
</style>
