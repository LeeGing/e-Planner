<template>
  <div>
    <page-header/>
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
              label="Due Date - MM/DD/YYYY"
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
import PageHeader from '@/components/Header.vue'
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
        completed: 'not completed',
        overdue: 'overdueFalse'
      },
      error: null,
      required: (value) => !!value || 'REQUIRED'
    }
  },
  components: {
    Panel,
    PageHeader
  },
  async mounted () {
    if (this.$store.state.user !== null) { this.note.userId = this.$store.state.user.id }
    console.log('note', this.note)
  },
  methods: {
    async create () {
      this.error = null
      if (this.note.duedate !== null) {
        this.note.duedate = new Date(this.note.duedate)
        this.note.duedate = (this.note.duedate.getMonth() + 1) + '/' + this.note.duedate.getDate() + '/' + this.note.duedate.getFullYear()
      }
      console.log(this.duedate)
      const allFieldsFilled = Object.keys(this.note).every(key => !!this.note[key])
      if (!allFieldsFilled) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await NotesService.post(this.note)
        this.$router.push({name: 'planner'})
        console.log(this.note)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

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
