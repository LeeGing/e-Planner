<template>
  <div id="root" class="margin-a main">
    <v-layout class='center'>
      <v-flex xs8 class='min-w20'>
        <div v-for="note in notes">
         <panel :title="note.title" class="mb-4">
              <h1>{{note.title}}</h1>
              <p>{{note.description}}</p>
              <h6>{{note.duedate}}</h6>
              <v-btn class="cyan" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>View</v-btn>
           </panel>
          </div>
      </v-flex>
      <v-flex xs4>
        <panel title="OPERATIONS" class="side-bar ml-5">
          <v-btn class='add-button' @click="navigateTo({name:'planner-create'})"> ADD NOTE </v-btn>
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
      notes: null
    }
  },
  async mounted () {
    // do a request to the back end for all the notes
    // when mounted, this.notes will wait for NotesService.index() to retreive data
    this.notes = (await NotesService.index()).data
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
.center {
    margin: auto;
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
  min-width:15%;
  width:22%;
  height:242px;
}
</style>
