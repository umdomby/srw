import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import TextSpeak from "../SR/Components/TextSpeak";
import GamepadInfo from "../SR/Components/Gamepad/GamepadInfo";
import Start from "../SR/Components/Start";
import {FileUploader} from "../SR/Components/File-uploader";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/TextSpeak">
                <TextSpeak/>
            </ComponentPreview>
            <ComponentPreview path="/GamepadInfo">
                <GamepadInfo/>
            </ComponentPreview>
            <ComponentPreview path="/Start">
                <Start/>
            </ComponentPreview>
            <ComponentPreview path="/FileUploader">
                <FileUploader/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;