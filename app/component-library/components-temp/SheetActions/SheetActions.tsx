// Third party dependencies.
import React, { useCallback } from 'react';
import { Platform, View } from 'react-native';

// External dependencies.
import { useStyles } from '../../hooks';
import ButtonTertiary from '../../components/Buttons/Button/variants/ButtonTertiary';
import { ButtonSize } from '../../components/Buttons/Button';
import Loader from '../Loader';
import generateTestId from '../../../../wdio/utils/generateTestId';

// Internal dependencies.
import { SheetActionsProps } from './SheetActions.types';
import styleSheet from './SheetActions.styles';

const SheetActions = ({ actions }: SheetActionsProps) => {
  const { styles } = useStyles(styleSheet, {});

  const renderActions = useCallback(
    () =>
      actions.map(
        ({ label, onPress, testID, isLoading, disabled, variant }, index) => {
          const key = `${label}-${index}`;
          // Avoid drawing separator above the first element
          const isFirstElement = index === 0;

          const buttonStyle = {
            opacity: disabled ? 0.5 : 1,
          };

          return (
            <React.Fragment key={key}>
              {actions.length > 1 && !isFirstElement && (
                <View style={styles.separator} />
              )}
              <View>
                <ButtonTertiary
                  onPress={onPress}
                  label={label}
                  size={ButtonSize.Lg}
                  disabled={disabled || isLoading}
                  style={buttonStyle}
                  variant={variant}
                  {...generateTestId(Platform, testID)}
                />
                {isLoading && <Loader size={'small'} />}
              </View>
            </React.Fragment>
          );
        },
      ),
    [actions, styles.separator],
  );

  return <>{renderActions()}</>;
};

export default SheetActions;
