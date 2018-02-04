<template>
  <div class='top-page'> 
    <div id="root" class="margin-a main">
      <v-layout class='center'>
        <v-flex xs8 class='min-w20'>
           <panel :title="note.title" class="mb-4">
                <h1>{{note.title}}</h1>
                <p>{{note.description}}</p>
                <h6>{{note.duedate}}</h6>
                <v-btn  class="cyan" @click="navigateTo({name:'planner-edit'})" dark>EDIT</v-btn>
             </panel>
        </v-flex>
        <v-flex xs4>
          <panel title="OPERATIONS" class="side-bar ml-5">
            <v-btn class='opt-button' @click="navigateTo({name:'planner-create'})"> ADD NOTE </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'planner-edit'})"> EDIT NOTE </v-btn>
          </panel>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>



<div id="root" class="margin-a">
    
</div>

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
  },
  components: {
    Panel,
    NotesService
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operations {
  min-width:30%;
}
.opt-button {
      font-size:0.875em;
      display:block;
      left:-8px;
      margin-top:35px;
      width:100%;
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
