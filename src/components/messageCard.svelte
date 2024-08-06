<script lang="ts">
    import { addNewMessage } from "$lib/messageRoutines";
    import { AllChatMessages, type ChatMessage } from "../stores/messageStore";
    import MessageItem from "./messageItem.svelte";      
    import { onMount, tick } from 'svelte';

    let msgList:any;        //  the message list contianer div we display
    let msgText:string;     //  the new message we add from the user input
    
    onMount(()=>{scrollToBottom(msgList)})    
    
    async function saveNewMessage() 
    {
        let newChatText = msgText.trim();
        if(newChatText.length  < 1)
        {
            return; 
        }
         
        addNewMessage(newChatText);    
        msgText = '';
        await tick();   
        await scrollToBottom(msgList);        
    }
    
    const scrollToBottom = async (node:any) => {
      await  node.scroll({ top: 1-node.scrollHeight, behavior: 'smooth' });
    };  
    
</script> 
 
<div class="mesagesSection">
    
    <div bind:this={msgList}>
        {#each $AllChatMessages as item}
        <MessageItem bind:msg={item}/> 
        {/each}
    </div> 
</div>
    
<div class="newMessageInput">    
    <div class="newMessage"><label for="newMessageText">Message</label></div>
    <div class="newMessage"><input type="text" bind:value={msgText} id="newMessageText"></div> 
    <button class="addMessage" on:click={()=>saveNewMessage()}>Add Message</button>
</div>
 
<style>
   
    .mesagesSection
    {
      display: flex; 
      align-items: left;      
      flex-direction: column;   
      background-color: #ecffff;
      color: rgba(44, 44, 252, 0.974)   ;        
      border-radius: 7px;
      border:3px double blue; 
      height: 333px;
      width: 60%; 
      flex: 1;
      overflow-y: auto;        
    }   
    
    .newMessageInput
    {
        margin-top: 20px;
        width: 60%;    
        height: 50%;
        background-color: #ecffff;
        color: rgba(44, 44, 252, 0.974)   ;        
        border-radius: 7px;
        border: double 3px blue;
    }
    
    .addMessage 
    {
        margin:  10px 20px;
    }
    
    .newMessage     
    {
        margin-top:  5px;
        margin-left: 20px;
        margin-bottom: 5px ; 
    }
    
</style>


