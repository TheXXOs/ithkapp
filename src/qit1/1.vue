<!-- THIS IS A TEMPLATE FOR HOW TO ADD MORE ITHKUIL VERSIONS. SOME CODE WILL ALSO NEED TO BE ADDED TO APP.VUE STILL -->
<template>
    <div>
        <h1>Ithkapp (etʰolîpš)</h1> <!-- THE TRANSLATION IN BRACKETS IS TEMPORARY AND WILL BE RE-DONE WHEN THIS IS FINISHED -->
        <p class="smalltext">As the documentation for Iţkuîl (Ithkuil I) is no longer hosted at ithkuil.net, this web app is based on <a href="https://ithkuil.place/mirror/2004-en-alt/" target="_blank">the mirror at ithkuil.place</a>.
        <br/>Definitions are sometimes taken from there, sometimes taken from <a href="http://www.ithkuil.net/" target="_blank">newer Ithkuil sites</a>, and sometimes written by the creator of this site.
        <br/>Glosses are <i>loosely</i> based on <a target="_blank" href="https://github.com/ngoriyasjil/IthkuilGloss">ırburučpaızya#2326</a>, which is a gloss bot for Ithkuil IV.
        <br/>All past and current forms of Ithkuil and all official documentation are by John Quijada.
        <br/>Click on a box's title to learn more about what it means.</p>
        <div class="section"> <!-- all OptionBoxes must be in a class="section" div or else the formatting will be messed up -->
            <OptionBox :json="gData.word" code="word" @send-message="handleSendMessage" ref="word" @modal="openModal"/> <!-- ref should be the same as code -->
        </div>
    </div>
</template>
<!-- INCLUDE A NOTE IN THE ROOT & AFFIX DESC.S THAT THE CHARACTERS š, ‘’, AND “” DON'T SHOW UP PROPERLY
    (being various unicode control characters for some reason)
    and so using a word-replace extension for the lexicon & affix list is advised. -->

<script>
import OptionBox from "../components/optionbox.vue"
// import grammardata from "path/to/grammardata.json"

export default {
    name: "Ithkuil_v1",
    components: {
        OptionBox,
    },
    props: {
        listenModal: Array,
        listenWordtype: String,
        listenWord: Object,
    },
    watch: {
        // listen for variables
        listenModal(arr) {
            this.updateFromModal(arr[0],arr[1]);
        },
        /*listenWordtype(str) { // Uncomment this value if multiple word types are required - str is the word type code set up in App.vue. Also uncomment switchWordType() and wordType
            this.switchWordType(str);
        },*/
        listenWord(obj) {
            this.gOptions = JSON.parse(JSON.stringify(obj));
            for (var property in obj) {
                this.updateFromModal(property,JSON.parse(JSON.stringify(obj[property])));
            }
            this.handleSendMessage(obj.word, "word"); // recalculate the word - MAKE SURE THIS IS A PROPERTY THAT EXISTS!
        },
        // emit variables
        ithkword(word) {
            this.$emit("gEmit",this.gOptions);
            this.$emit("ithkword",[word,this.ipa,this.gloss,this.fullGloss]);
        },
        ipa(ipa) {
            this.$emit("ithkword",[this.ithkword,ipa,this.gloss,this.fullGloss]);
        },
        gloss(gloss) {
            this.$emit("ithkword",[this.ithkword,this.ipa,gloss,this.fullGloss]);
        },
        fullGloss(gloss) {
            this.$emit("ithkword",[this.ithkword,this.ipa,this.gloss,gloss]);
        }
    },
    data() {
        return {
            defaultWord: "", // this should be whatever the default form of your "normal" word type is - whatever the algorithm generates with no option changes (ithkuil iv = "aal")
            settings: { // Settings - fill in with whatever you want the user to be able to change, with the following format:
                "Category A": { // Category title
                    "s1": ["Setting 1: ","defaultval",["defaultval","Fancy New Value"]] // dropdowns - "code": ["Visual Name","default value",[options]]
                },
                "Category B": {
                    "s2": ["Setting 2: ",false] // check boxes - "code": ["Visual Name:",true/false]
                }
            },
            gDefault: { // this should contain all of the grammar options' (dropdowns') default values
                "word": "",
            },
            //wordType: "",     set to whatever the default word type is - UNCOMMENT WITH LISTENWORDTYPE() ABOVE AND SWITCHWORDTYPE() BELOW TO ADD MULTIPLE WORD TYPES
            tabGroups: {"normal": [["word"]]}, // a dictionary representing the tab groups, based on word type
            gOptions: {}, //  leave as is - SHOULD BE WHERE YOU STORE/UPDATE GRAMMAR OPTIONS
            ithkword: "", //  leave as is - SHOULD BE THE FINAL WORD GENERATED
            ipa: "", //       leave as is - SHOULD BE THE IPA TRANSCRIPTION OF THE ABOVE WORD
            gloss: "", //     leave as is - SHOULD BE THE GLOSS (meaning) OF THE ABOVE WORD
            fullGloss: "", // leave as is - SHOULD BE A LONGER VERSION OF THE ABOVE GLOSS
            // gData: grammardata - uncomment when using a json file to store data
            gData: { // DELETE WHEN A JSON FILE HAS BEEN MADE
                "word": {'type':'text','title':'placeholder','popupdesc':'Hopefully this works :)'}
            }
        }
    },
    methods: {
        async handleSendMessage(value="",code="") { // what happens when an <OptionBox> updates its value
            if (code) {
                this.gOptions[code] = value
                // DO ANY FANCY VALUE UPDATING HERE (if necessary)
            }
            // RUN RECALCULATIONS HERE
            this.ithkword = this.gOptions.word;
            if (this.settings["Category B"].s2[1]) {this.ithkword += "AAAA"}
            this.ipa = this.gOptions.word;
            this.gloss = this.gOptions.word;
            this.fullGloss = this.gOptions.word;
            // above is a placeholder recalculation
        },
        openModal(code) { // leave as is - tells App.vue to open a modal
            this.$emit("modal",code);
        },
        updateFromModal(reference,value) { // leave as is - updates a dropdown from a modal
            this.$refs[reference].updateValue(value);
        },
        resetWord(gO=null) { // leave as is - resets the current word
            if (gO == null) {
                gO = this.gDefault;
            }
            this.gOptions = JSON.parse(JSON.stringify(gO));
            for (var property in gO) {
                this.updateFromModal(property,JSON.parse(JSON.stringify(gO[property])));
            }
        },
        /*switchWordType(type) { //UNCOMMENT THIS FUNCTION TO ADD MULTIPLE WORD TYPES - THE WORD TYPES SHOULD BE SET UP IN APP.VUE
            this.wordType = type;
            // RECALCULATE WORDS HERE
            this.handleSendMessage();
        },*/
    },
    beforeMount() {
        if (this.$cookies.isKey("ithkapp-settings1")) {
          this.settings = this.$cookies.get("ithkapp-settings1"); // replace the X with whatever the relevant langVer is
        }
        this.gOptions = JSON.parse(JSON.stringify(this.gDefault));
        this.handleSendMessage();
    },
}
</script>