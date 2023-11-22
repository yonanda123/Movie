import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {XMarkIcon, ChevronLeftIcon} from 'react-native-heroicons/outline';
import Loading from '../components/Loading';
import {debounce} from 'lodash';
import {fallbackMoviePoster, fetchSearchMovies, image185} from '../api/MovieDb';
import ProgressiveImage from 'rn-progressive-image';
import {theme, styles} from '../theme';

const {width, height} = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showAllResults, setShowAllResults] = useState(false);

  const handleSearch = value => {
    setSearchText(value);

    if (value && value.length >= 1) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: 'true',
        language: 'en-US',
        page: '1',
      }).then(data => {
        setLoading(false);
        if (data && data.results) {
          const filteredResults = data.results.filter(
            item =>
              item.original_title.toLowerCase().includes(value.toLowerCase()) ||
              (item.title &&
                item.title.toLowerCase().includes(value.toLowerCase())),
          );
          setResults(
            filteredResults.slice(
              0,
              showAllResults ? filteredResults.length : 6,
            ),
          );
        }
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleClearText = () => {
    setSearchText('');
    setResults([]);
    setLoading(false);
  };

  const handleTextChange = value => {
    setSearchText(value);
    handleTextDebounce(value);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleShowMore = () => {
    navigation.navigate('AllResultsScreen', {
      searchText,
      results,
    });
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-3">
          <ChevronLeftIcon size={24} color={theme.text} />
        </TouchableOpacity>
        <TextInput
          value={searchText}
          onChangeText={handleTextChange}
          placeholder="Cari Film"
          placeholderTextColor={'lightgray'}
          className="pl-5 flex-1 text-base font-semibold text-white tracking-wider"
          autoFocus={true}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={handleClearText}
            className="rounded-full p-2 m-1 bg-neutral-500">
            <XMarkIcon size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      {/* hasil pencarian */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movie', item)}>
                  <View className="space-y-2 mb-4">
                    <ProgressiveImage
                      className="rounded-3xl"
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{width: width * 0.44, height: height * 0.3}}
                    />
                    <Text className="text-gray-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>

          {/* Show More Button */}
          <TouchableOpacity
            onPress={handleShowMore}
            className={`p-3 rounded-md mb-3`}>
            <Text className= {`font-semibold text-center `} style={styles.text}>
              Show More
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/movieTime.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
