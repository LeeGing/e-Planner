<template>
  <div id="root">
    <v-layout column>
      <v-flex xs6 offset-xs3>
        <div v-for="note in notes">
         <panel title="Note" class="margin-b20">
              <h1>{{note.title}}</h1>
              <p>{{note.description}}</p>
              <h6>{{note.duedate}}</h6>
           </panel>
          </div>
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
  }
}

</script>


<style scoped>
.margin-b20 {
  margin-bottom:20px
}
</style>
