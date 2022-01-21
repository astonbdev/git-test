/** Formats form data into obj of {title, author, url} with
 * values from form, and calls addStory() from storyList
 * to generate Story from server. Finally, generates markup
 * with new story and appends to $allStoriesList
 */
 async function submitAndDisplayStory(e) {
    e.preventDefault();
  
    let storyObj = {};
  
    storyObj.title = $("#title-input").val();
    storyObj.author = $("#author-input").val();
    storyObj.url = $("#url-input").val();
  
    console.log(storyObj);
  
    //Works but do not understand
    const data = new FormData(e.target);
    console.log(data.entries());
  
    const value = Object.fromEntries(data.entries());
  
    console.log(value);
    
  
    
    const formData = $storySubmitForm.serializeArray().map((obj) => {
      //working
      const newObj = {};
      newObj[obj.name] = obj.value;
      return newObj;
    });
    
  
    
      const storyObj = {
        author : formData[0]["author"], 
        title: formData[1]["title"], 
        url: formData[2]["url"]
      };
      
  
    
    const storyObj = formData.reduce((prevVal, obj) => {
      let objKeys = Object.keys(obj);
      prevVal[objKeys[0]] = obj[objKeys[0]];
      return prevVal;
    });
    
  
    
    const storyInstance = await storyList.addStory(currentUser, storyObj);
    //console.log("storyInstance URL: " + storyInstance.url);
    //console.log(storyInstance);
    //unshift story to mem js
    $allStoriesList.prepend(generateStoryMarkup(storyInstance));
    hidePageComponents();
    $allStoriesList.show();
    
  }