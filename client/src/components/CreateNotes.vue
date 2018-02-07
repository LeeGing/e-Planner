<template>
  <div>
  <div>
    <v-layout class='center'>
      <v-flex xs6 offset-xs3>
        <panel title="NEW TASK">
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
            <v-text-field
              required
              :rules="[required]"
              label="Due Date - DD/MM/YY"
              v-model="note.duedate"
            ></v-text-field>
            <br>
            <v-btn class="cyan" @click="create" dark>Save</v-btn>
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

export default {
  name: 'Registration',
  data () {
    return {
      note: {
        title: null,
        description: null,
        duedate: null,
        userId: null,
        completed: 'false'
      },
      error: null,
      required: (value) => !!value || 'REQUIRED'
    }
  },
  components: {
    Panel
  },
  async mounted () {
    // do a request to the back end for all the notes
    // when mounted, this.notes will wait for NotesService.index() to retreive data
    if (this.$store.state.user !== null) { this.note.userId = this.$store.state.user.id }
    console.log('note', this.note)
  },
  methods: {
    async create () {
      this.error = null
      const allFieldsFilled = Object.keys(this.note).every(key => !!this.note[key])
      if (!allFieldsFilled) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        // send to backend
        await NotesService.post(this.note)
        this.$router.push({name: 'planner'})
        console.log(this.note)
      } catch (err) {
        console.log(err)
      }
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
    height:400px;
}
.error {
    color:red;
    background-color:white !important;
}
</style>

<!-- vuex will be used for key store related objects -->
