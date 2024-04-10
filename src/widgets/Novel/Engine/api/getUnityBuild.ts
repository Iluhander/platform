import { defaultEngineBasePath, defaultEngineEncoding } from '@/shared/common/lib/engine/engineContext';

/**
 * Getting unity build.
 * @description The function loads engine files.
 * @param playMode - true, if the engine play build is needed.
 * @param basePath - s3 location engine base path.
 * @returns Object, required for the <Unity /> component.
 */
export default function getUnityBuild(
  playMode = false,
  basePath = defaultEngineBasePath,
  encoding = defaultEngineEncoding
) {
  if (playMode) {
    basePath += 'Play/';
  } else {
    basePath += 'Edit/';
  }

  let suffix = 'game';
  if (!playMode) {
    suffix = 'edit';
  }

  // This is for testing with different Unity builds.

  if (localStorage.getItem('testFilesNames')) {
    // @ts-ignore
    const testFilesNames = JSON.parse(localStorage.getItem('testFilesNames'));

    return {
      loaderUrl: testFilesNames.loaderUrl,
      dataUrl: testFilesNames.dataUrl,
      frameworkUrl: testFilesNames.frameworkUrl,
      codeUrl: testFilesNames.codeUrl,
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'Aristocat Games Studio',
      productName: 'UwUNovelsEngine',
      productVersion: '1.0'
    };
  }

  return {
    loaderUrl: `${basePath}Web_${suffix}.loader.js`,
    dataUrl: `${basePath}Web_${suffix}.data.${encoding}`,
    frameworkUrl: `${basePath}Web_${suffix}.framework.js.${encoding}`,
    codeUrl: `${basePath}Web_${suffix}.wasm.${encoding}`,
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'Aristocat Games Studio',
    productName: 'UwUNovelsEngine',
    productVersion: '1.0'
  };
}
