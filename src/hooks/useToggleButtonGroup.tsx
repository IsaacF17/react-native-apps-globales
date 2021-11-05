import React, { useState } from 'react';
import ToggleButtonGroup from '../components/common/Buttons/ToggleButtonGroup/ToggleButtonGroup';

export interface IUseToggleButtonGroup {
  buttons: Array<string>;
  safeToggle?: boolean;
  initialSelectedIndexes?: Array<number>;
}

const useToggleButtonGroup = (props: IUseToggleButtonGroup) => {
  const { buttons, safeToggle, initialSelectedIndexes } = props;
  const [selectedIndexes, setSelectedIndexes] = useState<Array<number>>(
    initialSelectedIndexes || [],
  );

  const safeSetSelectedIndex = (newState: Array<number>) => {
    if (!safeToggle || newState.length >= 1) {
      setSelectedIndexes(newState);
    }
  };

  const Component = (
    <ToggleButtonGroup
      buttons={buttons}
      selectedIndexes={selectedIndexes}
      setSelectedIndexes={safeSetSelectedIndex}
    />
  );

  return [Component, selectedIndexes, safeSetSelectedIndex];
};

export default useToggleButtonGroup;
