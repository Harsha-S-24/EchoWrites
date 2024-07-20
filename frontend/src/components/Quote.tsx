import bg from '../assets/galaxy-cosmic-cliffs-carina-nebula-space-universe-hd-wallpaper-preview.jpg'
export const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col "
    style={{backgroundImage:`url(${bg})`,backgroundSize:'cover',backgroundPosition:'center'}}>
      <div className="flex justify-center">
        <div className="max-w-lg  ">
          <div className="text-3xl text-slate-50 font-bold">
            "Your story matters. Join our community of storytellers and let your voice be echoed around the world."
          </div>
          <div className="max-w-md  text-xl font-semibold mt-4 text-slate-100">Harsha</div>
          <div className="max-w-md text-md font-light text-slate-200">
            CEO | EchoWrites
          </div>
        </div>
      </div>
    </div>
  );
};
