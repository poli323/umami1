import { safeDecodeURI } from 'next-basics';
import { Button, Icon, Icons, Text } from 'react-basics';
import useNavigation from 'components/hooks/useNavigation';
import useMessages from 'components/hooks/useMessages';
import styles from './FilterTags.module.css';

export function FilterTags({ params }) {
  const { formatMessage, labels } = useMessages();
  const {
    router,
    makeUrl,
    query: { view },
  } = useNavigation();

  if (Object.keys(params).filter(key => params[key]).length === 0) {
    return null;
  }

  function handleCloseFilter(param) {
    if (!param) {
      router.push(makeUrl({ view }, true));
    } else {
      router.push(makeUrl({ [param]: undefined }));
    }
  }

  return (
    <div className={styles.filters}>
      <div className={styles.label}>{formatMessage(labels.filters)}</div>
      {Object.keys(params).map(key => {
        if (!params[key]) {
          return null;
        }
        return (
          <div key={key} className={styles.tag} onClick={() => handleCloseFilter(key)}>
            <Text>
              <b>{`${key}`}</b> = {`${safeDecodeURI(params[key])}`}
            </Text>
            <Icon>
              <Icons.Close />
            </Icon>
          </div>
        );
      })}
      <Button size="sm" variant="quiet" onClick={() => handleCloseFilter()}>
        <Icon>
          <Icons.Close />
        </Icon>
        <Text>{formatMessage(labels.clearAll)}</Text>
      </Button>
    </div>
  );
}

export default FilterTags;
