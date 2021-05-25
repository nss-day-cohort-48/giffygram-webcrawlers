export const ProfileSetup = () => {

    return `
    <div class="newPost">
    <div>
    <input value="" name="profileURL" id="profileURL" class="newPost__input" type="text" placeholder="Add URL of your picure">
    </div>
    <div>
        <input value="" name="profileAge" id="profileAge" class="newPost__input" type="number" placeholder="Age">
    </div>
    <div>
        <input value="" name="profileLocation" id="profileLocation" class="newPost__input" type="text" placeholder="Location">
    </div>

        <textarea name="profileAbout" id="profileAbout" class="newPost__input newPost__description" placeholder="Tell us about yourself..."></textarea>

        <button id="newProfileSubmit">Save</button>
        <button id="newProfileCancel">Cancel</button>
    </div>
    `
}