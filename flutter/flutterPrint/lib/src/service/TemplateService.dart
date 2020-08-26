
import '../entity/query/Query.dart';
import '../entity/Template.dart';
import '../mapper/TemplateMapper.dart';

class TemplateService {
  TemplateMapper _tmpMapper = new TemplateMapper();

  ///根据Id查询打印机
  Future<Template>  getTmpById(int  id) async{
    Template tmp  =  await _tmpMapper.getById(id);
    return tmp;
  }

  ///获取酒店所有打印机
  Future<List<Template>> findAllTmps()  async{
    List<Template> tmps =  await _tmpMapper.findItems(null);
    return tmps;
  }


  ///根据纸宽获取模板
  Future<List<Template>> findTmpsByPaperSize(int  paperSize)  async{
    List<Query> querys   =  new  List();
    querys.add(Query(Template.PAPER_SIZE,"=",paperSize));

    List<Template> tmps =  await _tmpMapper.findItems(querys);
    return tmps;
  }

}
