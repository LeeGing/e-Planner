<template>
  <div class='top-page'> 
    <div id="root">
      <v-layout class='center'>
        <v-flex xs8 class='min-w20'>
           <panel :title="note.title" class="mb-4">
                <p>Description: {{note.description}}</p>
                <h6>Due Date: {{note.duedate}}</h6>
                <br>
                <div v-if="note.completed !== true"> 
                  <v-btn  class="cyan" @click="completedNote" dark>Completed</v-btn>
                </div>
                 <div v-if="note.completed === true"> 
                  <p> This task has been completed. </p>
                </div>
             </panel>
        </v-flex>
        <v-flex xs4>
          <panel title="OPERATIONS" class="side-bar ml-5">
            <v-btn class='opt-button' @click="navigateTo({name:'planner-edit'})"> EDIT NOTE </v-btn>
            <v-btn class='opt-button' @click="deleteNote"> DELETE NOTE </v-btn>
          </panel>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import NotesService from '@/services/NotesService'

export default {
  data () {
    return {
      note: {}
    }
  },
  async mounted () {
    // this.store.state.route.params.noteId - vuex store, grabing the state from it,
    // since the store is synced with the router in main.js, when the router changes in the UI,
    // this vaulue also changes
    const noteId = this.$store.state.route.params.noteId
    this.note = (await NotesService.show(noteId)).data
    console.log(this.note.id)
    console.log('MONKEY', this.note)
  },
  components: {
    Panel,
    NotesService
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async completedNote () {
      // const noteId = this.$store.state.route.params.noteId
      try {
        // send to backend
        this.note.completed = true
        await NotesService.put(this.note)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteNote () {
      try {
        console.log(this.note.id)
        await NotesService.delete(
          this.note.id
        )
        this.$router.push({
          name: 'planner'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operations {
  min-width:30%;
}
.min-w20 {
  min-width:20em;
}
.center {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30em;
    width: 80%;
    padding: 10px;
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
.side-bar {
  position:fixed;
  width:22%;
  height:242px;
}
</style>

<!-- vuex will be used for key store related objects -->
