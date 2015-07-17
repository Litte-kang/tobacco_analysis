/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage',
    locals: {
      layout:   'homepage',
      title:    'Login',
      msg:      ''
    }
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

 'post /login': {
    controller: 'UserController',
    action: 'login',
    locals: {
        layout: 'homepage'
    }
  },
     

 'get /dashbord': {
      controller: 'DashbordController',
      action: 'index'
  },



  //鲜烟成熟度分析返回 view
  'get /fresh_analysis'                       :'FreshAnalysisController.index',
  //鲜烟成熟度分析统计返回 json
  'get /fresh_analysis/maturity/summery'      :'FreshAnalysisController.maturitySummery' ,    
  //鲜烟成熟度明细返回 json 
  'get /workflows/manage_fresh/tobaccos'      :'WorkflowController.getFreshTobaccos',


  //鲜烟品牌分析返回 view
  'get /fresh_analysis/breeds'                :'FreshAnalysisController.breedsAnalysis', 
  //鲜烟品牌分析返回 json
  'get /fresh_analysis/breeds/summery'        :'FreshAnalysisController.breedsSummery',
  //鲜烟品牌分析明细 返回json                    
  'get /workflows/fresh_tobacco/breeds'       :'WorkflowController.analysisTobaccoBreed',


  //鲜烟类型分析返回 view
  'get /fresh_analysis/types'                 :'FreshAnalysisController.typesAnalysis',
  //鲜烟类型分析统计返回 json
  'get /fresh_analysis/types/summery'         :'FreshAnalysisController.typesSummery',
  //鲜烟类型分析明细返回 json
  'get /workflows/fresh_tobacco/fresh_type'   :'WorkflowController.analysisTobaccoType',


  //干烟质量分析返回 view
  'get /dry_tobacco'                          :'FreshAnalysisController.dryTobacco',
  //干烟质量分析统计 JSON
  'get /dry_tobacco/summery'                  :'FreshAnalysisController.dryTobaccoSummery',
  //干烟质量分析明细 JSON
  'get /workflows/dries'                      :'WorkflowController.analysisDryTobacco',


  //装烟情况统计 view
  'get /fresh_tobacco/packings'               :'FreshAnalysisController.packings',
  //装烟情况统计 json
  'get /workflows/fresh_tobacco/packings'     :'WorkflowController.analysisPacking',


  //烤房使用情况统计
  'get /analysis_room_usage'                  :'WorkflowController.roomUsage',

 
 //烘烤量统计分析
 'get /baking_analysis/baking'                :'WorkflowController.bakingAnalysis',
 'get /workflows/baking_history'              :'WorkflowController.findBakingHistory',

 









  //Place options
  'get /counties/:id':                         'CountyController.show',
  'get /counties/:id/towns':                   'CountyController.getTowns',
  'get /towns/:id/stations':                   'CountyController.getStationsByTown',

  'get /cities/:id'                            :'CityController.getCounties',


  //Analysis json
  

  'get /workflows/manage_fresh'                :'WorkflowController.index',
  
  
  
  

 

  
  //Monitor
  'get /alarms'          :        'MonitorController.index',
  'get /alarms/:roomNo'  :        'MonitorController.alarms',


};
