import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import ZustandQ from "../zustand-切片模式";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ZustandQ">
                <ZustandQ/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
