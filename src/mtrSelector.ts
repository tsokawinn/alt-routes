class MTRSelector
{
    lineDropdown: HTMLSelectElement | null;
    stationDropdown: HTMLSelectElement | null;
    currentlyLoadedSelections: Array<Waypoint>;

    constructor(lineDrop: HTMLSelectElement | null, stationDrop: HTMLSelectElement | null)
    {
        this.lineDropdown = lineDrop;
        this.stationDropdown = stationDrop;
    }

    calculateSelectedStation(): Waypoint
    {
        let allWaypoints = obtainAllMTRWaypoints();
        let selectedStationID = this.stationDropdown.selectedOptions[0].value;
        //console.log(selectedStationID);
        for (let i = 0; i < allWaypoints.length; i++)
        {
            if (allWaypoints[i].getID() == selectedStationID)
            {
                //console.log("returning " + allWaypoints[i]);
                return allWaypoints[i];
            }
        }

        //console.log("No return")
        return null;
    }

    getSelectionID(): string
    {
        // Supposedly only 1 item is selectable.
        let lineID = this.lineDropdown.selectedOptions[0].value;
        let stationID = this.stationDropdown.selectedOptions[0].value;
        return lineID + "_" + stationID;
    }

    /**
     * Returns whether the current selection is valid: the default "---" option is not chosen.
     */
    selectionIsValid(): boolean
    {
        // Selection is valid when the default "0" option is not chosen.
        return this.stationDropdown.selectedOptions[0].value.indexOf("0") == -1;
    }

    /**
     * Checks the value of the fromDropdown, and populate the toDropdown accordingly.
     */
    updateDropdown(): void
    {
        // First insert a default option.
        let resultingDropdown = "<option value='0'>---</option>";

        // Then obtain the correct list of stations.
        //console.log(this.lineDropdown.selectedOptions[0].value)
        switch (this.lineDropdown.selectedOptions[0].value)
        {
            case "erl":
                this.currentlyLoadedSelections = MTR_ERL_ALL;
            break;
            case "tmle":
                this.currentlyLoadedSelections = MTR_TMLE_ALL;
            break;
            default:
                //console.log("default")
                this.currentlyLoadedSelections = [];
            break;
        }

        // Finally populate the dropdown list
        for (let i = 0; i < this.currentlyLoadedSelections.length; i++)
        {
            let station = this.currentlyLoadedSelections[i];
            let optionString = "<option value='" + station.getID() + "'>" + station.getName()+ "</option>";
            resultingDropdown += optionString;
        }

        this.stationDropdown.innerHTML = resultingDropdown;
        return;
    }
}