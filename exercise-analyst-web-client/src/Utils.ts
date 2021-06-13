export const getImageUrlForActivity = (activity: string) => {
  switch (activity) {
    case "Walking":
      return "https://media.self.com/photos/5fe261907e457d9a8b917a6f/4:3/w_2560%2Cc_limit/AdobeStock_292545314.jpeg";

    case "Front elevation of arms":
      return "https://www.saebo.com/wp-content/uploads/2017/01/get-moving-1024x683.jpg";

    case "Squats":
      return "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/05/man-squatting-outdoors-1296x728-header.jpg?w=1155&h=1528";

    case "Jump front & back":
      return "https://upl.stack.com/wp-content/uploads/2016/03/09143039/Vertical-Jump-STACK.jpg";

    case "Push ups":
      return "https://d2z0k43lzfi12d.cloudfront.net/blog/vcdn324/wp-content/uploads/2017/05/thumbnail_1200x800-1-1024x683.jpg";

    default:
      return "https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2013/09/inexpensiveExercise-1277759983-770x533-1-650x428.jpg";
  }
};

export const getCaloriesForExercises = (
  activity: string,
  weight: number,
  dateStart: string,
  dateEnd: string
) => {
  const start = new Date(dateStart).getTime();
  const end = new Date(dateEnd).getTime();

  const differenceInMs = end - start;
  const timeSpanInMinutes = differenceInMs / 60000;

  // MTU: https://golf.procon.org/met-values-for-800-activities/
  let met = 1;
  switch (activity) {
    case "Walking":
      met = 3.5;
      break;

    case "Front elevation of arms":
      met = 2.8;
      break;

    case "Squats":
      met = 3.8;
      break;

    case "Jump front & back":
      met = 3.8;
      break;

    case "Push ups":
      met = 3.8;
      break;

    default:
      met = 1;
      break;
  }

  const caloriesBurned = (timeSpanInMinutes * (met * 3.5 * weight)) / 200;
  return caloriesBurned.toFixed(0);
};

export const getUserFriendlyDate = (date: string) => {
  const dateLocal = new Date(date);

  return dateLocal.toLocaleDateString("pl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const getMusclesAffectedImgSrc = (activity: string) => {
  switch (activity) {
    case "Walking":
      return "https://spcfitz.com/wp-content/uploads/2020/08/farmers-walk-muscle.svg";

    case "Front elevation of arms":
      return "https://images.squarespace-cdn.com/content/v1/55e406fbe4b0b03c5e7543ae/1495743279360-PD3QLGY89B7RDJAPMI5M/ke17ZwdGBToddI8pDm48kKtWUCkc8Zzi56VudqKub7dZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGMd_TbU1pfbTX33UVAWh56L1YnqjjmqqQ8ARPooeD00N1lH3P2bFZvTItROhWrBJ0/One+Arm+Standing+Dumbbell+Lateral+Raises";

    case "Squats":
      return "http://www.burnthefatinnercircle.com/members/images/1700.png";

    case "Jump front & back":
      return "https://images.squarespace-cdn.com/content/v1/55e406fbe4b0b03c5e7543ae/1496703386505-2YKHO6S3CGHMACGDKSYN/ke17ZwdGBToddI8pDm48kB8AwxDMPEv2Of-EOmI-mE9Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFKAU1rmfBzwftmgQm1XdMCEooF7qKE0Vb7FtuVgWmK41tO8nJtk629tZGIWiyY3XQ/Bodyweight+Jump+Squats";

    case "Push ups":
      return "https://images.squarespace-cdn.com/content/v1/55e406fbe4b0b03c5e7543ae/1495708960028-W5FVJ2DRRQ5NTGFKUBKH/ke17ZwdGBToddI8pDm48kNEmcJeaBi860AgCyOnzqCdZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGiR-TbFu37kVvonJX1mRONy9YLoON-dly7rHby7Dt9CTqWIIaSPh2v08GbKqpiV54/Narrow-Hand+Push+Ups";

    default:
      return "https://st2.depositphotos.com/1909187/10981/i/950/depositphotos_109811754-stock-photo-chest-muscles-pectoralis-major-and.jpg";
  }
};

export const getDifferenceBetweenDates = (
  dateStart: string,
  dateEnd: string
) => {
  const start = new Date(dateStart).getTime();
  const end = new Date(dateEnd).getTime();

  const differenceInMs = end - start;

  return milisecondsToHMS(differenceInMs);
};

const milisecondsToHMS = (ms: any) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);

  return `${hours}h ${minutes}m ${seconds}s `;
};
