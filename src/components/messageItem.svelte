<script lang="ts">
    import type {ChatMessage} from '../stores/messageStore'    
    export let msg:ChatMessage;
</script>


<div class="messageSection">
    <span class="sender">{msg.messageSender}:</span><span class="messageText">  {msg.messageText}</span>
</div>


<style>
  
    .messageSection
    {
        background-color: #ecffff;
        color: rgba(44, 44, 252, 0.974)   ;        
        text-align: left; 
        margin: 4px 4px;    
    }
    
    .sender
    {
        background-color: yellow;    
        color: black;
        padding-right: 7px;
    }
    
    .messageTime
    {
        font-weight: 400;
    }
    
    .messageText
    {        
        background-color:#ecffff;        
        color: rgba(44, 44, 252, 0.974) ;  
        font-weight: 600;
        font-size: 14px;
        padding-left: 3px;
        padding-right: 3px;
    }
    
</style>