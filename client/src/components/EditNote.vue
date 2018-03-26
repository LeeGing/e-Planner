<template>
  <div>
    <page-header/>
    <v-layout class='center'>
      <v-flex xs6 offset-xs3>
        <panel title="EDIT TASK">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field class="border-b1"
              required
              :rules="[required]"
              label="Enter Task Title"
              v-model="note.title"
            ></v-text-field>
            <br>
            <v-text-field
              label="Enter Description"
              v-model="note.description"
              required
              :rules="[required]"
              multi-line
            ></v-text-field>
            <br>
            <!-- it would be nicer to have 3 input boxes for dd mm yy rather than self typing -->
             <v-text-field
              required
              :rules="[required]"
              label="Due Date - MM/DD/YYYY"
              v-model="note.duedate"
            ></v-text-field>
            <br>
            <v-btn class="cyan" @click="save" dark>SAVE</v-btn>
            <p class="error"> <br> {{error}} </p>
            <br>
            <div class="error"/>
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</div>
</template>

<script>
import Panel from '@/components/Panel'
import NotesService from '@/services/NotesService'
import PageHeader from '@/components/Header.vue'

export default {
  name: 'Registration',
  data () {
    return {
      note: {
        title: null,
        description: null,
        duedate: null
      },
      error: null,
      required: (value) => !!value || 'REQUIRED'
    }
  },
  components: {
    Panel,
    PageHeader
  },
  methods: {
    async save () {
      this.error = null
      this.note.duedate = new Date(this.note.duedate)
      this.note.duedate = (this.note.duedate.getMonth() + 1) + '/' + this.note.duedate.getDate() + '/' + this.note.duedate.getFullYear()
      const allFieldsFilled = Object.keys(this.note).every(key => !!this.note[key])
      console.log(this.note)
      if (!allFieldsFilled) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      const noteId = this.$store.state.route.params.noteId
      try {
        // send to backend
        await NotesService.put(this.note)
        this.$router.push({name: 'note', params: {noteId: noteId}
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    try {
      // grab the note id, grab the note data
      const noteId = this.$store.state.route.params.noteId
      this.note = (await NotesService.show(noteId)).data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30em;
    width: 80%;
    padding: 10px;
}
.error {
    color:red;
    background-color:white !important;
}
</style>

<!-- vuex will be used for key store related objects -->
